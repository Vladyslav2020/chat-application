import React, { useState, useEffect } from 'react';
import './index.css';

const TypingTracker = ({ name, typing }) => {
	const [dots, setDots] = useState('...');
	useEffect(() => {
		let timer = setInterval(() => {
			if (typing) {
				setDots(prevState =>
					prevState.length === 3 ? '' : prevState + '.',
				);
			}
		}, 300);
		return () => {
			clearInterval(timer);
		};
	}, [typing]);
	return (
		<div className={typing ? 'typing' : 'invisible'}>
			{name} is typing{dots}
		</div>
	);
};

export default TypingTracker;
