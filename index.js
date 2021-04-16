const http = require('http');

const server = http.createServer((req, res) => {res.end("Hello")});

server.listen(5000, () => {console.log("Server was started on PORT", 5000)});
const io = require('socket.io')(server);
const sockets = new Map();

function generateName(){
    let length = Math.floor(Math.random() * 5) + 4;
    let name = '';
    for (let i = 0; i < length; i++){
        name += String.fromCodePoint(65 + Math.floor(Math.random() * 26));
    }
    name += String(Math.floor(Math.random() * 100));
    return name;
}

io.on("connection", (socket) => {
    const name = generateName();
    sockets.set(socket, {name})
    socket.emit('set-name', {name});
});