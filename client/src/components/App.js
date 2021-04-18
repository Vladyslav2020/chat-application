import React, {useState, useEffect} from 'react';
import ChatBody from './ChatBody';
import ChatHeader from './ChatHeader';


const App = ({store, handlers}) => {
    return (
        <>
            <ChatHeader/>
            <ChatBody store = {store} handlers = {handlers}/>
        </>
    );
}

export default App;