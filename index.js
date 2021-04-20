const http = require('http');
require('dotenv').config();
const chatServer = require('./src/chatServer');

const server = http.createServer((req, res) => {
	res.end('Hello');
});

server.listen(process.env.PORT, () => {
	console.log('Server was started on PORT', process.env.PORT);
});
const io = require('socket.io')(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

chatServer(io);
