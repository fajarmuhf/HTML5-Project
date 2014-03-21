var ipaddress = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
var port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
server.listen( port, ipaddress, function() {
    console.log((new Date()) + ' Server is listening on port 8080');
});

var io = require('socket.io').listen(port);

io.sockets.on('connection', function (socket) {
  console.log('emit...');
  socket.emit('ping', { message: 'Hello from server ' + Date.now() });
  socket.on('pong', function (data) {
    console.log(data.message);
  });
});

console.log('listening on port 80');