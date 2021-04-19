import React, {useState} from 'react';
import ChatListItem from '../ChatListItem';
import './index.css';

const ChatsList = ({chats, selected, handlers}) => {
    const Chats = chats.length > 0? chats.map(chat => <ChatListItem selected = {chat.name === selected.name} 
        key = {chat.name}
        name = {chat.name} 
        avatar = {chat.avatar} 
        description = {chat.description}
        status = {chat.status}
        clickHandler = {handlers.chatSwitcher}
    />) : <div className = 'not-found'>Chats not found</div>;
    return (
        <div className = 'chats-list'>
            {Chats}
        </div>
    );
}

export default ChatsList;