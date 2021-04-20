const ChatBot = require("./ChatBotClass");

const EchoBot = new ChatBot({name: 'Echo bot', 
    description: 'Libero, error corporis quisquam natus deleniti reprehenderit accusantium! Explicabo omnis nemo numquam! Voluptatem sed eveniet neque, enim pariatur perferendis unde? Corporis quis temporibus aspernatur in quo, rem voluptas reprehenderit quod ex! Ducimus maiores vel qui illo! Cupiditate expedita eaque rem voluptates saepe praesentium autem facilis quia reprehenderit non in voluptatum, distinctio laboriosam illo mollitia dolorum, ullam vero a. Corporis, optio quaerat! Eum, amet.',
    avatar: 'https://previews.123rf.com/images/sombrecanari/sombrecanari2005/sombrecanari200500026/147540138-chat-bot-robot-avatar-in-circle-round-shape-isolated-on-white-background-stock-vector-illustration-a.jpg',
    status: 'online'
});

EchoBot.onMessage = function(socket, message){
    socket.emit('get-last-seen', {name: this.name, time: new Date().toISOString()});
    socket.emit('start-typing', {name: this.name});
    setTimeout(() => {
        socket.emit('finish-typing', {name: this.name});
        socket.emit('new-message', {
            name: this.name, 
            message,
            time: new Date().toISOString()
        });
    }, 500);
}

module.exports = EchoBot;