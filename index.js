var app = require('express')()
var http = require('http').Server(app)
var io = require('socket.io')(http)

// app.get('/', function(req, res) {
  // res.send('hiiiii~')
// }) 

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

io.on('connection', function(socket) {
  console.log('a user connected')
  
  socket.on('disconnect', function() {
    console.log('user disconnected')
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

  socket.on('div added', function() {
    socket.broadcast.emit('div added')
  })
  
})

http.listen(3000, function() {
  console.log('listening on *:3000')
})