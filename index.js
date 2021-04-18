const http = require('http');

const server = http.createServer((req, res) => {res.end("Hello")});

server.listen(5000, () => {console.log("Server was started on PORT", 5000)});
const io = require('socket.io')(server);
const clients = new Map();
let ID = 0;
const clientDescription = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat, vitae ratione. Nostrum eos temporibus beatae reprehenderit dolor porro explicabo illo, repudiandae odit? Consectetur, aspernatur. Repellendus libero rerum soluta perspiciatis quam.';
const botDescription = 'Libero, error corporis quisquam natus deleniti reprehenderit accusantium! Explicabo omnis nemo numquam! Voluptatem sed eveniet neque, enim pariatur perferendis unde? Corporis quis temporibus aspernatur in quo, rem voluptas reprehenderit quod ex! Ducimus maiores vel qui illo! Cupiditate expedita eaque rem voluptates saepe praesentium autem facilis quia reprehenderit non in voluptatum, distinctio laboriosam illo mollitia dolorum, ullam vero a. Corporis, optio quaerat! Eum, amet.';
const avatarUrl = 'http://static1.squarespace.com/static/54b7b93ce4b0a3e130d5d232/54e20ebce4b014cdbc3fd71b/5a992947e2c48320418ae5e0/1519987239570/icon.png?format=1500w';
let names = new Set(['Echo bot', 'Spam bot', 'Reverse bot', 'Ignore bot']);
let bots = [
    {
        name: 'Echo bot',
        description: botDescription,
        avatar: 'https://previews.123rf.com/images/sombrecanari/sombrecanari2005/sombrecanari200500026/147540138-chat-bot-robot-avatar-in-circle-round-shape-isolated-on-white-background-stock-vector-illustration-a.jpg',
        status: 'online',
        onMessage(socket, message){
            socket.emit('new-message', {
                name: this.name, 
                message,
                time: new Date().toISOString()
            })
        }
    },
    {
        name: 'Reverse bot',
        description: botDescription,
        avatar: 'https://i.pinimg.com/564x/f3/e0/df/f3e0df81ffe6933d4229872a978e5127.jpg',
        status: 'online',
        onMessage(socket, message){
            let newMessage = '';
            for (let i = 0; i < message.length; i++){
                newMessage += message[message.length - i - 1];
            }
            console.log(newMessage);
            setTimeout(() => {
                socket.emit('new-message', {
                    name: this.name, 
                    message: newMessage,
                    time: new Date().toISOString()
                });
            }, 3000);
        }
    },
    {
        name: 'Spam bot',
        description: botDescription,
        avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYGISw72diuR2hGSbgqdtrjJB683sY1MKU12r-rSaE-gRhvF2B3MbFCrWIk_zopXPCdVA&usqp=CAU',
        status: 'online',
        onMessage(socket, message){
            return;
        }
    },
    {
        name: 'Ignore bot',
        description: botDescription,
        avatar: 'https://i.lcpdfrusercontent.com/uploads/monthly_2017_12/avatarcnsrg-800.png.32505b3c44f71a6f6a85b98e12cdabe0.png',
        status: 'online',
        onMessage(socket, message){
            return;
        }
    }
];

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
            clients.set(id, {socket, name, id, description: clientDescription, status: 'online', avatar: avatarUrl});
            socket.emit('set-data', {name, id, description: clientDescription, status: 'online', avatar: avatarUrl}, reset=true);
            bots.forEach(bot => {
                console.log("Additing new chat for client");
                socket.emit('add-chat', {
                    name: bot.name,
                    description: bot.description,
                    avatar: bot.avatar,
                    status: bot.status
                });
            });
        }
        else{
            let client = clients.get(data.id);
            client.socket = socket;
            client.id = data.id;
            currentID = data.id;
            client.name = data.name;
            client.description = data.description;
            client.status = data.status;
            client.avatar = data.avatar;
            clients.set(currentID, client);
            socket.emit('set-data', {}, reset=false);
        }
        const currentClient = clients.get(currentID);
        Array.from(clients.values()).forEach(client => {
            if (client.id !== currentClient.id){
                console.log("Additing new chat for client");
                client.socket.emit('add-chat', {
                    name: currentClient.name, 
                    description: currentClient.description,
                    avatar: currentClient.avatar, 
                    status: currentClient.status
                });
            }
        })
    });
    socket.on('sending-message', ({id, name, message, time}) => {
        console.log("From", id, "to:", name, "message:", message, "time: ", time);
        Array.from(clients.values()).forEach(client => {
            if (client.name === name){
                client.socket.emit('new-message', {name, message, time});
            }
        });
        if (name.includes('bot')){
            const sender = clients.get(id);
            console.log('Sender:', (sender? 'defined':sender));
            if (sender){
                bots.forEach(bot => {
                    if (bot.name === name){
                        bot.onMessage(sender.socket, message);
                    }
                })
            }
        }
    });
});