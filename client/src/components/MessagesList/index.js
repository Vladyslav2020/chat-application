import React from 'react';
import Message from '../Message';
import './index.css';

const MessagesList = ({messages}) => {
    const Messages = messages.map(message => <Message userName = {message.name} message = {message.message} time = {message.time}/>)
    return (
        <div className = 'messages-list'>
            {Messages}
        </div>
    );
}

export default MessagesList;