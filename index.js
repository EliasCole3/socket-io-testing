var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// app.get('/', function(req, res) {
  // res.send('hiiiii~');
// }); 

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.get('/js/jquery.js', function(req, res){
  res.sendFile(__dirname + '/js/jquery.js');
});

app.get('/js/jquery-ui.js', function(req, res){
  res.sendFile(__dirname + '/js/jquery-ui.js');
});

app.get('/js/js.js', function(req, res){
  res.sendFile(__dirname + '/js/js.js');
});

io.on('connection', function(socket){
  console.log('a user connected');
  
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
    io.emit('chat message', msg);
  });

  socket.on('element dragged', function(dragObj){
    console.log('drag object: ');
    console.log(dragObj)
    // io.emit('element dragged', dragObj);
    socket.broadcast.emit('element dragged', dragObj);
  });
  
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});