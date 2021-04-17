import React from 'react';
import UserData from '../UserData';
import MessagesList from '../MessagesList';
import ChatsList from '../ChatsList';
import MessageInputter from '../MessageInputter';
import './index.css';

const ChatBody = ({store, handlers}) => {
    let currentChatFriend = store.chats.find(chat => (chat.name === store.currentChat.name)) || {};
    return (
        <div className = 'chat-body'>
            <div className = 'left-side'>
                <UserData name = {currentChatFriend.name} avatar = {currentChatFriend.avatar} description = {currentChatFriend.description}/>
                <MessagesList messages = {currentChatFriend.messages || []}/>
                <MessageInputter submitMessage = {handlers.submitMessage}/>
            </div>
            <div className = 'right-side'>
                <ChatsList selected = {currentChatFriend} chats = {store.chats || []} handlers = {handlers}/>
            </div>
        </div>
    );
}

export default ChatBody;