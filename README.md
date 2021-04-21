# Chat application

This project is a fully functional application. It consists of a chat server and a React client. This application allows you to chat with any other user in real time. When a new user connects to the server, it is automatically added to every client currently on the server. Also, each user has a chat with four bots: echo bot, reverse bot, spam bot and ignore bot.
* Echo bot - for each message replies with the same message.
* Reverse bot - for each message replies with the reverse message.
* Spam bot - ignores all messages and sends randoms messages in any time.
* Ignore bot - ignores all messages

## How to install this application

First of all you need to clone this repository:

```
$ git clone git@github.com:Vladyslav2020/chat-application.git
```

After that, you need to go to project directory:

```
$ cd chat-application
```

In the project directory, you need to run:

### `npm install`

Installs all required packages for back-end.

```
$ cd client
```

Goes to the client side.

### `npm install`

Installs all required packages for front-end.

```
$ cd ../
```

Goes back to the root of the application.

### `npm run start-server`

Runs the chat server to process all requests.

### `npm run start-client`

Runs the app in the development mode.
Open http://localhost:3000 to view it in the browser.
