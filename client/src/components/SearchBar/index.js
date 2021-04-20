import React from 'react';
import './index.css';

const SearchBar = ({ value, changeHandler }) => {
	return (
		<div className="search-bar">
			<input
				type="text"
				placeholder="Search..."
				value={value}
				onChange={event => changeHandler(event.target.value)}
			/>
		</div>
	);
};

export default SearchBar;
