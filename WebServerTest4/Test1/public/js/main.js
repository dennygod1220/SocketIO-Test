$(function(){
    var socket = io();

    var username = null;

    $('#btn').click(function() {
       username = $.trim($('#input').val());
       if(username){
        socket.emit('send user name',username); 
       }
       else{
           alert('請輸入東西');
       }
       
    });

    socket.on('id repeat',function(data){
        alert(data+'重複了');
    });

/*    socket.on('send to all client',function(data){
       
        $('#getmessage').append('<li>'+data);
    });
*/
});
