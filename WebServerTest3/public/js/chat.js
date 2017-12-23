$(function () {
  var socket = io();
  var uname = null;

  $('.login-btn').click(function () {
    uname = $.trim($('#loginName').val());
    if (uname) {
      socket.emit('login', {
        username: uname
      });
    } else {
      aler("請輸入暱稱!");
    }
  });

  socket.on('loginSucess', function (data) {
    if (data.username === uname) {
      checkin(data)
    } else {
      alert('用戶名不正確，請重新輸入');
    }
  });

  socket.on('loginFail', function (data) {
    alert('暱稱重複');
  });

  socket.on('add', function (data) {
    var html = '<p>系統消息:' + data.username + '已加入聊天室</p>';
    $('.chat-con').append(html);
  });

  function checkin(data) {
    $('.login-wrap').hide('slow');
    $('.chat-wrap').show('slow');
  }

  socket.on('leave', function (name) {
    if (name != null) {
      var html = '<p>FBI Warning:' + name + '已退出聊天室</p>';
      $('.chat-con').append(html);
    }
  });

  $('.sendBtn').click(function () {
    sendMessage()
  });
  $(document).keydown(function (event) {
    if (event.keyCode == 13) {
      sendMessage()
    }
  });

  function sendMessage() {
    var txt = $('#sendtxt').val();
    $('#sendtxt').val('');
    if (txt) {
      socket.emit('sendMessage', {
        username: uname,
        message: txt
      });
    }
  }

  socket.on('receiveMessage', function (data) {
    showMessage(data);
  });

  function showMessage(data) {
    var html;
    if (data.username === uname) {
      html = '<div class="chat-item item-right clearfix"><span class="img fr"></span><span class="message fr">' + data.message + '</span></div>'
    } else {
      html = '<div class="chat-item item-left clearfix rela"><span class="abs uname">' + data.username + '</span><span class="img fl"></span><span class="fl message">' + data.message + '</span></div>'
    }
    $('.chat-con').append(html);
  }
});