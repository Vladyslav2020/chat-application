const ChatBot = require("./ChatBotClass");

const IgnoreBot = new ChatBot({name: 'Ignore bot', 
    description: 'Libero, error corporis quisquam natus deleniti reprehenderit accusantium! Explicabo omnis nemo numquam! Voluptatem sed eveniet neque, enim pariatur perferendis unde? Corporis quis temporibus aspernatur in quo, rem voluptas reprehenderit quod ex! Ducimus maiores vel qui illo! Cupiditate expedita eaque rem voluptates saepe praesentium autem facilis quia reprehenderit non in voluptatum, distinctio laboriosam illo mollitia dolorum, ullam vero a. Corporis, optio quaerat! Eum, amet.',
    avatar: 'https://i.lcpdfrusercontent.com/uploads/monthly_2017_12/avatarcnsrg-800.png.32505b3c44f71a6f6a85b98e12cdabe0.png',
    status: 'online'
});

IgnoreBot.onMessage = function(socket, message){}

module.exports = IgnoreBot;