var socket = io();

$(function(){
  $('form').submit(function(){
    socket.emit('chat message',$('#m').val());
    $('#m').val('');
    return false;
  });

  socket.on('chat message',function(data){
    $('#messages').append($('<li>').text(data));
  });
});
