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
socket.emit('get-stored-data', storedData);
const initialState = {name: ""};

function StoreManager(){
  const [store, setStore] = useState(initialState);
  socket.on('new-message', (data) => {
      console.log("Message", data.message);
  });
  socket.on('set-data', (data) => {
      setStore(prevState => ({...prevState, ...(storedData || {}), ...data}));
      localStorage.setItem("chat-data", JSON.stringify({...(storedData || {}), ...data}));
  });
    return (
        <React.StrictMode>
            <App store = {store}/>
        </React.StrictMode>
    );
}

ReactDOM.render(
  <StoreManager />,
  document.getElementById('root')
);
