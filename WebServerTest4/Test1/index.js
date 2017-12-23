var express = require('express');
var app = express();
var server = require('http').createServer(app);
var PORT = 9999;
var io = require('socket.io')(server);
var user = 0;
var userid = [];

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
    res.sendfile('/index.html');
    console.log('connect');
});

server.listen(PORT, function () {
    console.log('server listen on port: ' + PORT);
});

io.on('connection', function (socket) {
    console.log('a user is connect' + socket.id);

    socket.on('send user name', function (username) {

        for (var i = 0; i < userid.length; i++) {
            if (userid[i] == username) {
                //暱稱重複事件，
                io.sockets.connected[socket.id].emit('id repeat', username);
            }
        }
        userid.push(username);
        for (var i = 0; i < userid.length; i++) {
            for (var j = i + 1; j < userid.length; j++) {
                if (userid[i] === userid[j]) {
                    console.log('is repeat')
                    userid.splice(j, 1)
                }
            }
        }
        console.log(userid.join());
    });
});