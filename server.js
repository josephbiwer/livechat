var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

// Server listening on port 5050
const PORT = process.env.PORT || 5050;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Static files
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

// Socket is connected
io.on('connection', function (socket) {
  console.log('client has connected')

  // Message received on server side
  socket.on('send message', msg => {
    socket.broadcast.emit('add message', msg);
  })

  // User disconnected from the server
  socket.on('disconnect', () => console.log('client has disconnected'))
});