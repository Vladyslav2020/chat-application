import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:5000');
let storedData = localStorage.getItem("chat-data");
if (storedData){
    storedData = JSON.parse(storedData);
}
socket.emit('get-stored-data', {id: storedData.id, name: storedData.name, description: storedData.description, status: storedData.status});
const initialState = {name: "", id: "", chats: [], currentChat: {name: ''}};
let [store, setStore] = [null, null];

socket.on('new-message', (data) => {
    setStore(prevState => {
        prevState.chats.forEach(chat => {
            if (chat.name === data.name){
                chat.messages.push({message: data.message, time: data.time, isMyMessage: false});
                return;
            }
        });
        return {...prevState, chats: [...prevState.chats]};
    });
});
socket.on('start-typing', (data) => {
    setStore(prevState => {
        prevState.chats.forEach(chat => {
            if (chat.name === data.name){
                chat.typing = true;
            }
        });
        return {...prevState, chats: prevState.chats};
    });
});
socket.on('finish-typing', (data) => {
    setStore(prevState => {
        prevState.chats.forEach(chat => {
            if (chat.name === data.name){
                chat.typing = false;
            }
        });
        return {...prevState, chats: prevState.chats};
    });
})
socket.on('set-data', (data, reset) => {
    if (reset){
        setStore(prevState => ({...initialState, ...data}));
        localStorage.setItem("chat-data", JSON.stringify({...initialState, ...data}))
    }
    else{
        setStore(prevState => ({...prevState, ...(storedData || {}), ...data}));
        localStorage.setItem("chat-data", JSON.stringify({...(storedData || {}), ...data}));
    }
});
socket.on('add-chat', (newChat) => {
    setStore(prevState => {
        let existChat = prevState.chats.find(chat => newChat.name === chat.name);
        if (!existChat){
            localStorage.setItem("chat-data", JSON.stringify({...prevState, chats: [...prevState.chats, {...newChat, typing: false, messages: []}]}))
            return {...prevState, chats: [...prevState.chats, {...newChat, typing: false, messages: []}]};
        }
        else
            return {...prevState};
    });
    if (store.chats.length > 0){
        setStore(prevState => ({...prevState, currentChat: {name: store.chats[0].name}}));
    }
});

function StoreManager(){
    [store, setStore] = useState(initialState);
    const chatSwitcher = (newActiveChat) => {
            setStore(prevState => {
                localStorage.setItem("chat-data", JSON.stringify({...prevState, currentChat: {name: newActiveChat}}));
                return {...prevState, currentChat: {name: newActiveChat}};
            });
        }
    const submitMessage = (message) => {
        let currentTime = new Date().toISOString();
        setStore(prevState => {
            prevState.chats.forEach(chat => {
                if (chat.name === prevState.currentChat.name){
                    chat.messages.push({message: message, time: currentTime, isMyMessage: true});
                    return;
                }
            });
            return {...prevState, chats: [...prevState.chats]};
        });
        socket.emit('sending-message', {id: store.id, name: store.currentChat.name, message: message, time: currentTime});
    }
    
    return (
        <React.StrictMode>
            <App store = {store} handlers = {{chatSwitcher, submitMessage}}/>
        </React.StrictMode>
    );
}


ReactDOM.render(
    <StoreManager />,
    document.getElementById('root')
);
