import React, { Component } from 'react';
import { Emoji } from 'emoji-mart-lite';
import styled from 'styled-components';

import './App.css';

import Container from './Container';

const HomeContainer = styled.main`
  min-height: 100vh;
  padding: 0 0.5rem;
  font-family: inherit;
`;

class App extends Component {
  render() {
    return (
      <HomeContainer>
        <header className="App-header">
          <div className="App-logo">
            <Emoji emoji={'grinning'} size={32} />
          </div>
          <h1 className="App-title">Welcome to Emoji Game</h1>
        </header>
        <Container />
      </HomeContainer>
    );
  }
}

export default App;
