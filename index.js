const http = require('http');

const server = http.createServer((req, res) => {res.end("Hello")});

server.listen(5000, () => {console.log("Server was started on PORT", 5000)});
const io = require('socket.io')(server);
const clients = new Map();
let ID = 0;
const clientDescription = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat, vitae ratione. Nostrum eos temporibus beatae reprehenderit dolor porro explicabo illo, repudiandae odit? Consectetur, aspernatur. Repellendus libero rerum soluta perspiciatis quam.';
let names = new Set();

function generateName(){
    let length = Math.floor(Math.random() * 5) + 4;
    let name = '';
    for (let i = 0; i < length; i++){
        name += String.fromCodePoint(65 + Math.floor(Math.random() * 26));
    }
    name += String(Math.floor(Math.random() * 100));
    if (names.has(name)){
        return generateName();
    }
    else{
        names.add(name);
        return name;
    }
}

function generateId(){
    ID++;
    let id = '';
    for (let i = 0; i < 15; i++){
        id += String.fromCodePoint(40 + Math.floor(Math.random() * 70));
    }
    id += String(ID);
    return id;
}

io.on("connection", (socket) => {
    socket.on('get-stored-data', (data) => {
        let currentID = '';
        if (!data || !clients.get(data.id)){
            const name = generateName();
            const id = generateId()
            currentID = id;
            clients.set(id, {socket, name, id, description: clientDescription, status: 'online'});
            socket.emit('set-data', {name, id, description: clientDescription, status: 'online'});
        }
        else{
            let client = clients.get(data.id);
            client.socket = socket;
            client.id = data.id;
            currentID = data.id;
            client.name = data.name;
            client.description = data.description;
            client.status = data.status;
            clients.set(currentID, client);
            socket.emit('set-data', {});
        }
        const currentClient = clients.get(currentID);
        Array.from(clients.values()).forEach(client => {
            if (client.id !== currentClient.id){
                client.socket.emit('add-client', {
                    name: currentClient.name, 
                    description: currentClient.description, 
                    status: currentClient.status
                });
            }
        })
    });
});