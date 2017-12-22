var socket = io();

$(function(){
  $('#mybtn').click(function(){
    socket.emit('send message',$('#myinput').val());
    $('#myinput').val('');
    return false;
  });
});

socket.on('send message',function(data){
  $('#myul').append('<li>'+data);
});