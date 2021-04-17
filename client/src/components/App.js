import React, {useState, useEffect} from 'react';
import ChatBody from './ChatBody';
import ChatHeader from './ChatHeader';


const App = ({store, handlers}) => {
    console.log("App prop store", store);
    return (
        <>
            <ChatHeader/>
            <ChatBody store = {store} handlers = {handlers}/>
        </>
    );
}

export default App;