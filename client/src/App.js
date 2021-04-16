import React, {useState, useEffect} from 'react';


const App = ({store}) => {
    console.log("App prop store", store);
    return (
        <h1>{store.name}</h1>
    );
}

export default App;