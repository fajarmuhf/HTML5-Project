var socketIO = require('socket.io');
var http = require('http');
var fs = require('fs');
var index = fs.readFileSync('index.html');

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
var port = process.env.OPENSHIFT_NODEJS_PORT || 80;

var httpServer = http.createServer(function (request, response) {
  response.writeHead(200,{'Content-Type' : 'text/html'});
  response.write(index);
  response.end();
  /*request.addListener('end', function () {
       clientFiles.serve(request, response);
  });*/
}).listen(port,ipaddress);

var webSocket = socketIO.listen(httpServer);


webSocket.on('connection', function (socket) {
  console.log('emit...');
  socket.emit('ping', { message: 'Hello from server ' + Date.now() });
  socket.on('pong', function (data) {
    console.log(data.message);
  });
});

console.log('hello');


