const ChatBot = require("./ChatBotClass");

const ReverseBot = new ChatBot({name: 'Reverse bot', 
    description: 'Libero, error corporis quisquam natus deleniti reprehenderit accusantium! Explicabo omnis nemo numquam! Voluptatem sed eveniet neque, enim pariatur perferendis unde? Corporis quis temporibus aspernatur in quo, rem voluptas reprehenderit quod ex! Ducimus maiores vel qui illo! Cupiditate expedita eaque rem voluptates saepe praesentium autem facilis quia reprehenderit non in voluptatum, distinctio laboriosam illo mollitia dolorum, ullam vero a. Corporis, optio quaerat! Eum, amet.',
    avatar: 'https://i.pinimg.com/564x/f3/e0/df/f3e0df81ffe6933d4229872a978e5127.jpg',
    status: 'online'
});

ReverseBot.onMessage = function(socket, message){
    socket.emit('get-last-seen', {name: this.name, time: new Date().toISOString()});
    let newMessage = '';
    for (let i = 0; i < message.length; i++){
        newMessage += message[message.length - i - 1];
    }
    socket.emit('start-typing', {name: this.name});
    setTimeout(() => {
        socket.emit('finish-typing', {name: this.name});
        socket.emit('new-message', {
            name: this.name, 
            message: newMessage,
            time: new Date().toISOString()
        });
    }, 3000);
}

module.exports = ReverseBot;