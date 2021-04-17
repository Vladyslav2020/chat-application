import React from 'react';
import './index.css';

const Message = ({message, userName, time}) => {
    return (
        <div className = 'message'>
            <div className = 'title'>
                <div className = 'name'>{userName}</div>
                <div className = 'time'>
                    {new Date(time).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}
                </div>
            </div>
            <div className = 'text'>{message}</div>
        </div>
    );
}

export default Message;