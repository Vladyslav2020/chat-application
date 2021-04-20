import React, { useState, useEffect } from 'react';
import ChatBody from './ChatBody';
import ChatHeader from './ChatHeader';

const App = ({ store, handlers }) => {
	const [hiddenSide, setHiddenSide] = useState('right');
	return (
		<>
			<ChatHeader hiddenSide={hiddenSide} changeVisibleSide={setHiddenSide} />
			<ChatBody
				store={store}
				handlers={{ ...handlers, changeVisibleSide: setHiddenSide }}
				hiddenSide={hiddenSide}
			/>
		</>
	);
};

export default App;
