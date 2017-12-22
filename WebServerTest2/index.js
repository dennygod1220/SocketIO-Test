var express = require('express');
var app = express();
var server = require('http').createServer(app);
var PORT = 9999;
var io = require('socket.io')(server);

app.use(express.static(__dirname + '/public'));

app.get('/',function(req,res){
  res.sendfile('index.html');
});

server.listen(PORT,function(){
  console.log('Server listen on :'+PORT);
});

io.on('connection',function(socket){
  console.log('a user is connect');

  socket.on('disconnect',function(){
    console.log('a user is Dead');
  });

  socket.on('send message',function(data){
    io.emit('send message',data);
  });

});