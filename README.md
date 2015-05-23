# taillog-demo
Listen to demo multiple log files

#业务场景：
线上生产服务器，不方便将服务器权限开放给技术（研发）人员，但是排除故障又需要将服务器状况让技术人员实时看到，采用此程序将是首选。

#Business scenario:
Online production server, the server is not convenient to open rights to technology (R & D) personnel, but they need to troubleshoot the server status allows technicians to see in real time, using this procedure will be preferred.

#run：
```shell
node  debug.js
```
##jquery 可以改用任意版本，只是界面上简单使用了以下。
socket.io.js  是socket.io的，没任何修改。

###程序支持多个日志文件的监控和界面上可视化订阅任何一个或多个日志。
###Visualization subscribe to any one or more log on the program supports multiple log files to monitor and interface
```javascript
var CONF = {
	"PHPerror":"/usr/local/php/var/log/php_errors.log",
	"NodeLog":"/data/www/nodejs_plus/app.log",
	"PlusAccess":"/usr/local/nginx/logs/plus.access.log",
	"ManagerAccess":"/usr/local/nginx/logs/manager.access.log",
	"MarketAccess":"/usr/local/nginx/logs/market.access.log"
}
```
```HTML
<libal>PHP error:<input type="checkbox" class="roomName" name="PHPerror"></libal>
<libal>Node log:<input type="checkbox" class="roomName" name="NodeLog"></libal>
<libal>Plus server access:<input type="checkbox" class="roomName" name="PlusAccess"></libal>
<libal>Manager server access:<input type="checkbox" class="roomName" name="ManagerAccess"></libal>
<libal>Market server access:<input type="checkbox" class="roomName" name="MarketAccess"></libal>
```
