import React, {useState} from 'react';
import ChatListItem from '../ChatListItem';
import './index.css';

const ChatList = ({chats, selected, handlers}) => {
    const [selectedTab, setSelectedTab] = useState('online');
    const Chats = chats.filter(chat => (chat.status === selectedTab || selectedTab === 'all'))
        .map(chat => <ChatListItem selected = {chat.name === selected.name} 
            key = {chat.name}
            name = {chat.name} 
            avatar = {chat.avatar} 
            description = {chat.description}
            status = {chat.status}
            clickHandler = {handlers.chatSwitcher}
            />);
    const tabClickHandler = (newSelecting, event) => {
        setSelectedTab(newSelecting);
    }
        return (
        <div className = 'chat-list'>
            <div className = 'tab-list'>
                <div className = {`tab ${selectedTab === 'online' && 'selected'}`} onClick = {tabClickHandler.bind(null, 'online')}>Online</div>
                <div className = {`tab ${selectedTab === 'all' && 'selected'}`} onClick = {tabClickHandler.bind(null , 'all')}>All</div>
            </div>
            {Chats}
        </div>
    );
}

export default ChatList;