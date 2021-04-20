import React from 'react';
import Message from '../Message';
import './index.css';

const MessagesList = ({myName, userName, messages, lastSeen}) => {
    let lastSeenMessageIndex = -1;
    const isMyMessageLast = (messages.length? messages[messages.length - 1].isMyMessage: false);
    for (let i = 0; i < messages.length; i++){
        if (messages[i].isMyMessage && new Date(messages[i].time) < new Date(lastSeen)){
            lastSeenMessageIndex = i;
        }
    }
    const Messages = messages.map((message, index) => {
        const newMessage =  (<Message needToScroll = {index === messages.length - 1}
            key = {index} 
            name = {message.isMyMessage? myName: userName} 
            message = {message.message} 
            time = {message.time}
            isMyMessage = {message.isMyMessage}
        />);
        if (isMyMessageLast && index === lastSeenMessageIndex){
            return (
                <>
                    {newMessage}
                    <div className = 'seen-tracker'>
                        Seen {new Date(lastSeen).toLocaleString('en-US', { 
                            hour: 'numeric', 
                            minute: 'numeric', 
                            hour12: true }).toLocaleLowerCase()}
                    </div>
                </>
            );
        }
        else{
            return newMessage;
        }
    });
    return (
        <div className = 'messages-list'>
            {Messages}
        </div>
    );
}

export default MessagesList;