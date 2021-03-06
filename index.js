var app = require('express')()
var http = require('http').Server(app)
var io = require('socket.io')(http)

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html')
})

app.get('/js/jquery.js', function(req, res) {
  res.sendFile(__dirname + '/js/jquery.js')
})

app.get('/js/jquery-ui.js', function(req, res) {
  res.sendFile(__dirname + '/js/jquery-ui.js')
})

app.get('/js/moment.js', function(req, res) {
  res.sendFile(__dirname + '/js/moment.js')
})

app.get('/js/vis.js', function(req, res) {
  res.sendFile(__dirname + '/js/vis.js')
})

app.get('/js/bootstrap.js', function(req, res) {
  res.sendFile(__dirname + '/js/bootstrap.js')
})

app.get('/js/inflection.js', function(req, res) {
  res.sendFile(__dirname + '/js/inflection.js')
})

app.get('/js/deepcopy.js', function(req, res) {
  res.sendFile(__dirname + '/js/deepcopy.js')
})

app.get('/js/socket-io.js', function(req, res) {
  res.sendFile(__dirname + '/js/socket-io.js')
})

app.get('/js/ebot.js', function(req, res) {
  res.sendFile(__dirname + '/js/ebot.js')
})

app.get('/js/js.js', function(req, res) {
  res.sendFile(__dirname + '/js/js.js')
})

app.get('/css/css.css', function(req, res) {
  res.sendFile(__dirname + '/css/css.css')
})

app.get('/css/bootstrap.css', function(req, res) {
  res.sendFile(__dirname + '/css/bootstrap.css')
})

app.get('/css/vis.css', function(req, res) {
  res.sendFile(__dirname + '/css/vis.css')
})

app.get('/css/jquery-ui.css', function(req, res) {
  res.sendFile(__dirname + '/css/jquery-ui.css')
})

app.get('/node_modules/howler/howler.js', function(req, res) {
  res.sendFile(__dirname + '/node_modules/howler/howler.js')
})

app.get('/sounds/me-ding.wav', function(req, res) {
  res.sendFile(__dirname + '/sounds/me-ding.wav')
})

app.get('/sounds/me-user-connected.wav', function(req, res) {
  res.sendFile(__dirname + '/sounds/me-user-connected.wav')
})

app.get('/sounds/me-user-disconnected.wav', function(req, res) {
  res.sendFile(__dirname + '/sounds/me-user-disconnected.wav')
})




io.on('connection', function(socket) {
  console.log('a user connected')
  io.emit('user connected');
  
  socket.on('disconnect', function() {
    console.log('user disconnected')
    io.emit('user disconnected')
  })
  
  socket.on('chat message', function(msg) {
    console.log('message: ' + msg)
    io.emit('chat message', msg)
  })

  socket.on('element dragged', function(dragObj) {
    console.log('drag object: ')
    console.log(dragObj)
    // io.emit('element dragged', dragObj)
    socket.broadcast.emit('element dragged', dragObj)
  })

  socket.on('element resized', function(emitObj) {
    socket.broadcast.emit('element resized', emitObj)
  })

  socket.on('div added', function() {
    socket.broadcast.emit('div added')
  })
  
})

http.listen(3000, function() {
  console.log('listening on *:3000')
})


 // // sending to sender-client only
 // socket.emit('message', "this is a test");

 // // sending to all clients, include sender
 // io.emit('message', "this is a test");

 // // sending to all clients except sender
 // socket.broadcast.emit('message', "this is a test");

 // // sending to all clients in 'game' room(channel) except sender
 // socket.broadcast.to('game').emit('message', 'nice game');

 // // sending to all clients in 'game' room(channel), include sender
 // io.in('game').emit('message', 'cool game');

 // // sending to sender client, only if they are in 'game' room(channel)
 // socket.to('game').emit('message', 'enjoy the game');

 // // sending to all clients in namespace 'myNamespace', include sender
 // io.of('myNamespace').emit('message', 'gg');

 // // sending to individual socketid
 // socket.broadcast.to(socketid).emit('message', 'for your eyes only');