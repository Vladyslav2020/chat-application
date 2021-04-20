import React, {useState} from 'react';
import UserData from '../UserData';
import MessagesList from '../MessagesList';
import ChatListController from '../ChatsListController';
import MessageInputter from '../MessageInputter';
import './index.css';
import SearchBar from '../SearchBar';
import TypingTracker from '../TypingTracker';

const ChatBody = ({store, handlers, hiddenSide}) => {
    const [searchBarValue, setSearchBarValue] = useState('');
    const changeSearchBarValueHandler = (newValue) => {
        setSearchBarValue(newValue);
    }
    let currentChatFriend = store.chats.find(chat => (chat.name === store.currentChat.name)) || {name: '', avatar:'', description: '', status: '', typing: false};
    return (
        <div className = 'chat-body'>
            <div className = {`left-side ${hiddenSide === 'left'? 'hidden': ''}`}>
                <UserData name = {currentChatFriend.name} 
                    avatar = {currentChatFriend.avatar} 
                    description = {currentChatFriend.description}
                />
                <MessagesList myName = {store.name} 
                    userName = {store.currentChat.name} 
                    messages = {currentChatFriend.messages || []}
                    lastSeen = {currentChatFriend.lastSeen}
                />
                <TypingTracker name = {currentChatFriend.name} typing = {currentChatFriend.typing} />
                <MessageInputter typingTracker = {handlers.typingHandler} submitMessage = {handlers.submitMessage}/>
            </div>
            <div className = {`right-side ${hiddenSide === 'right'? 'hidden': ''}`}>
                <ChatListController searchBar = {searchBarValue} selected = {currentChatFriend} chats = {store.chats || []} handlers = {handlers}/>
                <SearchBar value = {searchBarValue} changeHandler = {changeSearchBarValueHandler}/>
            </div>
        </div>
    );
}

export default ChatBody;