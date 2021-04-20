import React, { useRef, useEffect } from 'react';
import './index.css';

const Message = ({ name, message, time, isMyMessage, needToScroll }) => {
	const myRef = useRef(0);
	useEffect(() => {
		if (needToScroll) myRef.current.scrollIntoView();
	}, [myRef]);
	return (
		<div ref={needToScroll ? myRef : null} className={`message ${isMyMessage ? 'mine' : ''}`}>
			<div className="arrow"></div>
			<div className="title">
				<div className="name">{name}</div>
				<div className="time">
					{new Date(time).toLocaleString('en-US', {
						hour: 'numeric',
						minute: 'numeric',
						hour12: true,
					})}
				</div>
			</div>
			<div className="text">{message}</div>
		</div>
	);
};

export default Message;
