const bots = require("./utils/bots/ChatBotArray");
const generateId = require("./utils/functions/generateId");
const getUniqueNameForUser = require("./utils/functions/getUniqueNameForUser");
const client = require('./utils/defaultUserParams');

function chatServer(io){
    const clients = new Map();
    io.on("connection", (socket) => {
        socket.on('get-stored-data', (data) => {
            let currentID = '';
            if (!data || !clients.get(data.id)){
                const name = getUniqueNameForUser();
                const id = generateId()
                currentID = id;
                clients.set(id, {socket, name, id, description: client.description, status: 'online', avatar: client.avatar});
                socket.emit('set-data', {name, id, description: client.description, status: 'online', avatar: client.avatar}, reset=true);
                bots.forEach(bot => {
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
            Array.from(clients.values()).forEach(client => {
                if (client.name === name){
                    client.socket.emit('new-message', {name, message, time});
                }
            });
            if (name.includes('bot')){
                const sender = clients.get(id);
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
}

module.exports = chatServer;