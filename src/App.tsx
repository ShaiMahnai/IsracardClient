import React from 'react';
import './App.css';
import * as components from "./components/";


function App() {
    return (
        <div className="App">
            <components.TaskUpload/>
            <components.Tasks/>
        </div>
    );
}

export default App;
