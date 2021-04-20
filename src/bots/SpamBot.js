const generateRandomText = require("../utils/functions/generateRandomText");
const getRandomTimeDelay = require("../utils/functions/getRandomTimeDelay");
const ChatBot = require("./ChatBotClass");

const SpamBot = new ChatBot({name: 'Spam bot', 
    description: 'Libero, error corporis quisquam natus deleniti reprehenderit accusantium! Explicabo omnis nemo numquam! Voluptatem sed eveniet neque, enim pariatur perferendis unde? Corporis quis temporibus aspernatur in quo, rem voluptas reprehenderit quod ex! Ducimus maiores vel qui illo! Cupiditate expedita eaque rem voluptates saepe praesentium autem facilis quia reprehenderit non in voluptatum, distinctio laboriosam illo mollitia dolorum, ullam vero a. Corporis, optio quaerat! Eum, amet.',
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYGISw72diuR2hGSbgqdtrjJB683sY1MKU12r-rSaE-gRhvF2B3MbFCrWIk_zopXPCdVA&usqp=CAU',
    status: 'online'
});

SpamBot.onMessage = function(socket, message){
    socket.emit('get-last-seen', {name: this.name, time: new Date().toISOString()});
}

SpamBot.startSpamming = function(clients){
    let preparedSpamTimeout = [];
    setInterval(() => {
        if (clients.size > preparedSpamTimeout.length){
            for (let i = 0; i < clients.size - preparedSpamTimeout.length; i++)
                preparedSpamTimeout.push(false);
        }
        for (let i = 0; i < clients.size; i++){
            if (!preparedSpamTimeout[i]){
                preparedSpamTimeout[i] = true;
                const delay = getRandomTimeDelay(10000, 120000)
                setTimeout(() => spammingController(Array.from(clients.values())[i].socket, i, preparedSpamTimeout), 
                    delay);
                setTimeout(() => Array.from(clients.values())[i].socket.emit('start-typing', {name: SpamBot.name}), delay - 5000);
            }
        }
    }, 10000);
}

function spammingController(socket, index, preparedSpamTimeout){
    spamming(socket);
    preparedSpamTimeout[index] = false;
}

function spamming(socket){
    const messageLength = Math.floor(Math.random() * 20) + 5;
    socket.emit('finish-typing', {name: SpamBot.name});
    socket.emit('new-message', {name: SpamBot.name, message: generateRandomText(messageLength), time: new Date().toISOString()});
}

module.exports = SpamBot;