import React, {useState, useEffect} from 'react';
import ChatBody from './ChatBody';
import ChatHeader from './ChatHeader';


const App = ({store}) => {
    console.log("App prop store", store);
    return (
        <>
            <ChatHeader/>
            <ChatBody name = {store.name} description = {store.description}/>
        </>
    );
}

export default App;