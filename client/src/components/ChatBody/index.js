import React from 'react';
import UserData from '../UserData';
import './index.css';

const ChatBody = ({name, description}) => {
    return (
        <div className = 'chat-body'>
            <UserData name = {name} description = {description}/>
        </div>
    );
}

export default ChatBody;