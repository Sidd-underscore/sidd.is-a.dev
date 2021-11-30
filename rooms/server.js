var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('public'));

app.get('/c', function(req, res) {
   res.sendfile('views/chat.html');
});

app.get('/', function(req, res) {
   res.sendfile('views/index.html');
});

//Whenever someone connects this gets executed
io.on('connection', function(socket) {
   console.log('A user connected');

  socket.on('disconnect', function () {
      console.log('A user disconnected');
     
   });
  socket.on('update', function(msg){
    io.emit(msg.id.split("-")[0], {msg:msg.msg, id:msg.id.split("-")[1]})
  });

});

http.listen(3000, function() {
   console.log('listening on *:3000');
});