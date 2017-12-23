var express = require('express');
var app = express();
var server = require('http').createServer(app);
var PORT = 9999;
var io = require('socket.io')(server);

var users = [];

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
    io.sockets.emit('leave',username);
    users.map(function(val,index){
      if(val.username === username){
        users.splice(index,1);
      }
    });
  });

  var isNewPerson = true;
  var username = null;

  socket.on('login',function(data){
    for(var i=0;i<users.length;i++){
      if(users[i].username === data.username){
        isNewPerson = false;
        break;
      }else{
        isNewPerson = true;
      }
    }
    if(isNewPerson){
      username = data.username;
      users.push({
        username:data.username
      });

      socket.emit('loginSucess',data);
      io.sockets.emit('add',data);
    }else{
      socket.emit('loginFail','');
    }
  });

  socket.on('sendMessage',function(data){
    io.sockets.emit('receiveMessage',data)
});

});