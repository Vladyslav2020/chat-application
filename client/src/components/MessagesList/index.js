import React from 'react';
import Message from '../Message';
import './index.css';

const MessagesList = ({myName, userName, messages}) => {
    const Messages = messages.map((message, index) => <Message needToScroll = {index === messages.length - 1}
        key = {index} 
        name = {message.isMyMessage? myName: userName} 
        message = {message.message} 
        time = {message.time}
        isMyMessage = {message.isMyMessage}/>);
    
    return (
        <div className = 'messages-list'>
            {Messages}
        </div>
    );
}

export default MessagesList;