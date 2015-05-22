/**
 * taillog demo
 * Created by yuenshui on 15/5/22.
 */
var fs = require('fs');
var app = require('http').createServer(handler)
var sio = require('socket.io');
var taillog = require('taillog');

app.listen(3032);
io = sio.listen(app);

function handler (req, res) {
	if(req.url == "/") {
		res.writeHead(200, { 'Content-type': 'text/html'});
		res.end(fs.readFileSync(__dirname + '/debuglog.html'));
	}
	if(req.url == "/socket.io.js") {
		res.writeHead(200);
		res.end(fs.readFileSync(__dirname + '/socket.io.js'));
	}
	if(req.url == "/jquery.min.js") {
		res.writeHead(200);
		res.end(fs.readFileSync(__dirname + '/jquery.min.js'));
	}
}


io.on('connection', function (socket) {
	// 这里可以通过身份来判断是否收听日志数据
	
	socket.on("addListen", function(data) {
		if(typeof data.roomName == "undefined" || typeof CONF[data.roomName] == "undefined") {
			socket.emit('addListen', {
				error: 5001,
				roomName: data.roomName
			});
			return ;
		}
		socket.join(data.roomName);
		socket.emit('addListen', {
			error: 0,
			roomName: data.roomName
		});
	});
	
	socket.on("delListen", function(data) {
		if(typeof data.roomName == "undefined" || typeof CONF[data.roomName] == "undefined") {
			socket.emit('delListen', {
				error: 5001,
				roomName: data.roomName
			});
			return ;
		}
		socket.leave(data.roomName);
		socket.emit('delListen', {
			error: 0,
			roomName: data.roomName
		});
	});
});

io.configure(function () {
	io.set('authorization', function (handshakeData, callback) {
		// 这里写上自己的身份验证，如果不公开使用的话
		return callback(null, true);
	});
	io.set('resource', '/taillog');
});

//// 上面是http服务器和socket.io服务器的设置
//// 下面是taillog的使用代码

var CONF = {
	"PHPerror":"/usr/local/php/var/log/php_errors.log",
	"NodeLog":"/data/www/nodejs_plus/app.log",
	"PlusAccess":"/usr/local/nginx/logs/plus.access.log",
	"ManagerAccess":"/usr/local/nginx/logs/manager.access.log",
	"MarketAccess":"/usr/local/nginx/logs/market.access.log"
}

var taillogHand = {};
// 创建监听
for(var i in CONF) {
	taillogHand[i] = taillog.createListen({
		filePath: CONF[i],
		interval: 10
	});
	taillogHand[i].on('data', function(rootName) {
			return function (data) {
				io.sockets.in(rootName).emit("log", data);
			}
		}(i)
	);

	taillogHand[i].start();
}
