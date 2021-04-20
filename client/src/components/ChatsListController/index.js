import React, { useState } from 'react';
import ChatsList from '../ChatsList';
import './index.css';

const ChatsListController = ({ chats, selected, handlers, searchBar }) => {
	const [selectedTab, setSelectedTab] = useState('online');
	const filteredChats = chats
		.filter(chat => chat.name.toLowerCase().includes(searchBar.toLowerCase()))
		.filter(chat => chat.status === selectedTab || selectedTab === 'all');
	const tabClickHandler = newSelecting => {
		setSelectedTab(newSelecting);
	};
	return (
		<>
			<div className="tab-list">
				<div className={`tab ${selectedTab === 'online' && 'selected'}`} onClick={tabClickHandler.bind(null, 'online')}>
					Online
				</div>
				<div className={`tab ${selectedTab === 'all' && 'selected'}`} onClick={tabClickHandler.bind(null, 'all')}>
					All
				</div>
			</div>
			<ChatsList chats={filteredChats} selected={selected} handlers={handlers} />
		</>
	);
};

export default ChatsListController;
