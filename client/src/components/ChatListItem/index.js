import React from 'react';
import './index.css';

const ChatListItem = ({ name, avatar, description, status, selected, handlers }) => {
	const clickHandler = () => {
		handlers.clickHandler(name);
		handlers.changeVisibleSide('right');
	};
	return (
		<div className={`chat-list-item ${selected && 'selected'}`} onClick={clickHandler}>
			<div className="avatar">
				<img src={avatar} />
				<div className={`status ${status}`}></div>
			</div>
			<div className="content">
				<div className="name">{name}</div>
				<div className="description">{description}</div>
			</div>
		</div>
	);
};

export default ChatListItem;
