import React, { useState } from 'react';
import './index.css';

const MessageInputter = ({ submitMessage, typingTracker }) => {
	const [value, setValue] = useState('');
	const changeHandler = event => {
		typingTracker();
		setValue(event.target.value);
	};
	const submitHandler = event => {
		event.preventDefault();
		if (value.trim()) submitMessage(value);
		setValue('');
	};
	return (
		<div className="message-inputter">
			<form>
				<input
					type="text"
					placeholder="Start chatting!"
					autoFocus
					value={value}
					onChange={changeHandler}
				/>
				<button type="submit" onClick={submitHandler}>
					Send message
				</button>
			</form>
		</div>
	);
};

export default MessageInputter;
