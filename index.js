const http = require('http');
const chatServer = require('./src/chatServer');

const server = http.createServer((req, res) => {res.end("Hello")});

server.listen(5000, () => {console.log("Server was started on PORT", 5000)});
const io = require('socket.io')(server);

chatServer(io);