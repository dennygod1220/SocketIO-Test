var express = require('express');
var app = express();
var server = require('http').createServer(app);
var PORT = 9999;
//引入socket.io ，並傳入http對象
var io = require('socket.io')(server);

app.use(express.static(__dirname+'/public'));

app.get('/',function(req,res){
  res.sendfile('index.html');
});

server.listen(PORT,function(){
  console.log('server listen on :' + PORT);
});

io.on('connection', function(socket){
  console.log('a user connected');

  socket.on('chat message',function(data){
    io.emit('chat message',data);
  });

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});
/*io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
  });
});
*/