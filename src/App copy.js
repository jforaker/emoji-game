import React, { Component } from 'react';
import { Emoji } from 'emoji-mart-lite';

import './App.css';

import Container from './Container';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="App-logo">
            <Emoji emoji={'grinning'} size={32} />
          </div>
          <h1 className="App-title">Welcome to Emoji Game</h1>
        </header>
        <Container />
      </div>
    );
  }
}

export default App;
