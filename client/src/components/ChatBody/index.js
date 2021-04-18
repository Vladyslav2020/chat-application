import React, {useState} from 'react';
import UserData from '../UserData';
import MessagesList from '../MessagesList';
import ChatListController from '../ChatsListController';
import MessageInputter from '../MessageInputter';
import './index.css';
import SearchBar from '../SearchBar';
import TypingTracker from '../TypingTracker';

const ChatBody = ({store, handlers}) => {
    const [searchBarValue, setSearchBarValue] = useState('');
    const changeSearchBarValueHandler = (newValue) => {
        setSearchBarValue(newValue);
    }
    let currentChatFriend = store.chats.find(chat => (chat.name === store.currentChat.name)) || {};
    return (
        <div className = 'chat-body'>
            <div className = 'left-side'>
                <UserData name = {currentChatFriend.name} 
                    avatar = {currentChatFriend.avatar} 
                    description = {currentChatFriend.description}
                />
                <MessagesList myName = {store.name} userName = {store.currentChat.name} messages = {currentChatFriend.messages || []}/>
                <TypingTracker name = {currentChatFriend.name} typing = {currentChatFriend.typing} />
                <MessageInputter submitMessage = {handlers.submitMessage}/>
            </div>
            <div className = 'right-side'>
                <ChatListController searchBar = {searchBarValue} selected = {currentChatFriend} chats = {store.chats || []} handlers = {handlers}/>
                <SearchBar value = {searchBarValue} changeHandler = {changeSearchBarValueHandler}/>
            </div>
        </div>
    );
}

export default ChatBody;