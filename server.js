var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

const PORT = process.env.PORT || 5050;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
  console.log('client has connected')

  socket.on('send message', msg => {
    console.log(`msg: ${msg}`)
    socket.broadcast.emit('add message', msg);
  })

  socket.on('disconnect', () => console.log('client has disconnected'))
});