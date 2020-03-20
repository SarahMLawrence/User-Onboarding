import React, { useDebugValue } from 'react';
import logo from './logo.svg';
import './App.css';

import UserForm from './components/UserForm';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      
      </header>
      <UserForm />
    </div>
  );
}

export default App;
