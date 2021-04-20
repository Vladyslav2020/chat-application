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
if (storedData){
    socket.emit('get-stored-data', {id: storedData.id, name: storedData.name, avatar: storedData.avatar, description: storedData.description, status: storedData.status});
}
else{
    socket.emit('get-stored-data', null)
}
const initialState = {name: "", id: "", typing: {status: false, lastTime: 0}, chats: [], currentChat: {name: ''}};
let [store, setStore] = [null, null];

window.onfocus = () => {
    if (store.status !== 'online'){
        socket.emit('set-status-online', {id: store.id});
        socket.emit('set-last-seen', {id: store.id, name: store.currentChat.name, time: new Date().toISOString()});
        setStore(prevState => {
            localStorage.setItem("chat-data", JSON.stringify({...prevState, status: 'online'}));
            return {...prevState, status: 'online'};
        })
    }
}

window.onblur = () => {
    if (store.status === 'online'){
        setTimeout(() => {
            socket.emit('set-status-offline', {id: store.id});
            setStore(prevState => {
                localStorage.setItem("chat-data", JSON.stringify({...prevState, status: 'offline'}));
                return {...prevState, status: 'offline'};
            });
        }, 1000);
    }
}

socket.on('new-message', (data) => {
    setStore(prevState => {
        prevState.chats.forEach(chat => {
            if (chat.name === data.name){
                chat.messages.push({message: data.message, time: data.time, isMyMessage: false});
                if (store.status === 'online' && chat.name === store.currentChat.name){
                    socket.emit('set-last-seen', {id: store.id, name: data.name, time: new Date().toISOString()});
                }
            }
        });
        localStorage.setItem("chat-data", JSON.stringify({...prevState, chats: [...prevState.chats]}));
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
        localStorage.setItem("chat-data", JSON.stringify({...prevState, chats: prevState.chats}));
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
        localStorage.setItem("chat-data", JSON.stringify({...prevState, chats: prevState.chats}));
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
            localStorage.setItem("chat-data", JSON.stringify({...prevState, chats: [...prevState.chats, {...newChat, lastSeen: new Date().toISOString(), typing: false, messages: []}]}));
            return {...prevState, chats: [...prevState.chats, {...newChat, typing: false, messages: []}]};
        }
        else
            return {...prevState};
    });
    if (store.chats.length > 0){
        setStore(prevState => {
            localStorage.setItem("chat-data", JSON.stringify({...prevState, currentChat: {name: store.chats[0].name}}));
            return {...prevState, currentChat: {name: store.chats[0].name}};
        });
    }
});

socket.on('get-status-online', ({name}) => {
    setStore(prevState => {
        prevState.chats.forEach(chat => {
            if (chat.name === name){
                chat.status = 'online';
            }
        });
        localStorage.setItem("chat-data", JSON.stringify({...prevState, chats: prevState.chats}));
        return {...prevState, chats: prevState.chats};
    });
});

socket.on('get-status-offline', ({name}) => {
    setStore(prevState => {
        prevState.chats.forEach(chat => {
            if (chat.name === name){
                chat.status = 'offline';
            }
        });
        localStorage.setItem("chat-data", JSON.stringify({...prevState, chats: prevState.chats}));
        return {...prevState, chats: prevState.chats};
    });
});

socket.on('delete-user', ({name}) => {
    setStore(prevState => {
        const filteredChats = prevState.chats.filter(chat => chat.name !== name);
        localStorage.setItem("chat-data", JSON.stringify({...prevState, chats: filteredChats}));
        return {...prevState, chats: filteredChats};
    });
    if (store.chats.length > 0){
        setStore(prevState => {
            localStorage.setItem("chat-data", JSON.stringify({...prevState, currentChat: {name: store.chats[0].name}}));
            return {...prevState, currentChat: {name: store.chats[0].name}};
        });
    }
});
socket.on('get-last-seen', ({name, time}) => {
    setStore(prevState => {
        prevState.chats.forEach(chat => {
            if (chat.name === name){
                chat.lastSeen = time;
            }
        });
        localStorage.setItem("chat-data", JSON.stringify({...prevState, chats: prevState.chats}));
        return {...prevState, chats: prevState.chats};
    });
});

function StoreManager(){
    [store, setStore] = useState(initialState);
    const chatSwitcher = (newActiveChat) => {
        if (store.typing.status){
            socket.emit('finish-typing', {id: store.id, name: store.currentChat.name});
            setStore(prevState => {
                localStorage.setItem("chat-data", JSON.stringify({...prevState, typing: {status: false, lastTime: 0}}));
                return {...prevState, typing: {status: false, lastTime: 0}};
            })
        }
        setStore(prevState => {
            localStorage.setItem("chat-data", JSON.stringify({...prevState, currentChat: {name: newActiveChat}}));
            return {...prevState, currentChat: {name: newActiveChat}};
        });
        if (store.status === 'online'){
            socket.emit('set-last-seen', {id: store.id, name: newActiveChat, time: new Date().toISOString()});
        }
    }
    const submitMessage = (message) => {
        if (store.typing.status){
            socket.emit('finish-typing', {id: store.id, name: store.currentChat.name});
            setStore(prevState => {
                localStorage.setItem("chat-data", JSON.stringify({...prevState, typing: {status: false, lastTime: 0}}));
                return {...prevState, typing: {status: false, lastTime: 0}};
            })
        }
        let currentTime = new Date().toISOString();
        setStore(prevState => {
            prevState.chats.forEach(chat => {
                if (chat.name === prevState.currentChat.name){
                    chat.messages.push({message: message, time: currentTime, isMyMessage: true});
                }
            });
            localStorage.setItem("chat-data", JSON.stringify({...prevState, chats: [...prevState.chats]}));
            return {...prevState, chats: [...prevState.chats]};
        });
        socket.emit('sending-message', {id: store.id, name: store.currentChat.name, message: message, time: currentTime});
    }
    const typingHandler = () => {
        if (!store.typing.status){
            socket.emit('start-typing', {id: store.id, name: store.currentChat.name});
            setStore(prevState => {
                localStorage.setItem("chat-data", JSON.stringify({...prevState, typing: {status: true, lastTime: Date.now()}}));
                return {...prevState, typing: {status: true, lastTime: Date.now()}};
            });
        }
        else{
            setStore(prevState => {
                localStorage.setItem("chat-data", JSON.stringify({...prevState, typing: {status: true, lastTime: Date.now()}}));
                return {...prevState, typing: {status: true, lastTime: Date.now()}};
            });
        }
        setTimeout(() => {
            if (store.typing.status && Date.now() - store.typing.lastTime >= 500){
                socket.emit('finish-typing', {id: store.id, name: store.currentChat.name});
                setStore(prevState => {
                    localStorage.setItem("chat-data", JSON.stringify({...prevState, typing: {status: false, lastTime: 0}}));
                    return {...prevState, typing: {status: false, lastTime: 0}};
                });
            }
        }, 600);
    }
    return (
        <React.StrictMode>
            <App store = {store} handlers = {{chatSwitcher, submitMessage, typingHandler}}/>
        </React.StrictMode>
    );
}


ReactDOM.render(
    <StoreManager />,
    document.getElementById('root')
);
