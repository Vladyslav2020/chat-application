import React from 'react';
import './index.css';

const UserData = ({ name, avatar, description }) => {
	return (
		<div className="user-data">
			<div className="avatar">
				<img src={avatar} />
			</div>
			<div className="content">
				<div className="name">{name}</div>
				<div className="description">{description}</div>
			</div>
		</div>
	);
};

export default UserData;
