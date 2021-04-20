import React from 'react';
import './index.css';

const ChatHeader = ({ hiddenSide, changeVisibleSide }) => {
	const clickHandler = () => {
		changeVisibleSide('left');
	};
	return (
		<div className="chat-header">
			<div className={`come-back ${hiddenSide === 'left' ? 'hidden' : ''}`} onClick={clickHandler}>
				<i className="fas fa-arrow-left"></i>
			</div>
			Chat bots 2.0
		</div>
	);
};

export default ChatHeader;
