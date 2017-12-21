// 首先要引入express ，借用express規劃路由
var express = require('express');
var app = express();
//引入http模組，並載入express
var server = require('http').createServer(app);
var PORT =9999;

app.use(express.static(__dirname));

app.get('/',function(req,res){
  res.send('hello');
});

server.listen(PORT,function(){
  console.log('server listen port on:'+PORT);
});