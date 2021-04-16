import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:5000');
const initialState = {name: ""};

function StoreManager(){
  const [store, setStore] = useState(initialState);
  socket.on('new-message', (data) => {
      console.log("Message", data.message);
  });
  socket.on('set-name', (data) => {
      setStore(prevState => ({...prevState, name: data.name}));
      console.log("Store", store);
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
