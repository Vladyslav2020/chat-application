const bots = require("./bots/ChatBotArray");
const generateId = require("./utils/functions/generateId");
const getUniqueNameForUser = require("./utils/functions/getUniqueNameForUser");
const client = require('./utils/defaultUserParams');

function chatServer(io){
    const clients = new Map();
    bots[2].startSpamming(clients);
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
                    currentClient.socket.emit('add-chat', {
                        name: client.name, 
                        description: client.description,
                        avatar: client.avatar, 
                        status: client.status
                    });
                }
            })
        });
        socket.on('sending-message', ({id, name, message, time}) => {
            const sender = clients.get(id);
            if (!sender)
                return;
            Array.from(clients.values()).forEach(client => {
                if (client.name === name){
                    client.socket.emit('new-message', {name: sender.name, message, time});
                }
            });
            if (name.includes('bot')){
                bots.forEach(bot => {
                    if (bot.name === name){
                        bot.onMessage(sender.socket, message);
                    }
                });
            }
        });
        socket.on('start-typing', ({id, name}) => {
            const sender = clients.get(id);
            if (sender){
                Array.from(clients.values()).forEach(client => {
                    if (client.name === name){
                        client.socket.emit('start-typing', {name: sender.name});
                    }
                });
            }
        });
        socket.on('finish-typing', ({id, name}) => {
            const sender = clients.get(id);
            if (sender){
                Array.from(clients.values()).forEach(client => {
                    if (client.name === name){
                        client.socket.emit('finish-typing', {name: sender.name});
                    }
                });
            }
        });
        socket.on('set-status-online', ({id}) => {
            const sender = clients.get(id);
            if (sender){
                Array.from(clients.values()).forEach(client => {
                    if (client.name !== sender.name){
                        client.socket.emit('get-status-online', {name: sender.name});
                    }
                });
            }
        });
        socket.on('set-status-offline', ({id}) => {
            const sender = clients.get(id);
            if (sender){
                Array.from(clients.values()).forEach(client => {
                    if (client.name !== sender.name){
                        client.socket.emit('get-status-offline', {name: sender.name});
                    }
                });
            }
        });
    });
}

module.exports = chatServer;