const ChatBot = require("./ChatBotClass");

const SpamBot = new ChatBot({name: 'Spam bot', 
    description: 'Libero, error corporis quisquam natus deleniti reprehenderit accusantium! Explicabo omnis nemo numquam! Voluptatem sed eveniet neque, enim pariatur perferendis unde? Corporis quis temporibus aspernatur in quo, rem voluptas reprehenderit quod ex! Ducimus maiores vel qui illo! Cupiditate expedita eaque rem voluptates saepe praesentium autem facilis quia reprehenderit non in voluptatum, distinctio laboriosam illo mollitia dolorum, ullam vero a. Corporis, optio quaerat! Eum, amet.',
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYGISw72diuR2hGSbgqdtrjJB683sY1MKU12r-rSaE-gRhvF2B3MbFCrWIk_zopXPCdVA&usqp=CAU',
    status: 'online'
});

SpamBot.onMessage = function(socket, message){}

module.exports = SpamBot;