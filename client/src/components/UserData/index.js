import React from 'react';
import './index.css';

const UserData = ({name, description}) => {
    return (
        <div className = 'user-data'>
            <div className = 'avatar'>
                <img href = '#'/>
            </div>
            <div className = 'content'>
                <div className = 'name'>{name}</div>
                <div className = 'description'>{description}</div>
            </div>
        </div>
    );
}

export default UserData;