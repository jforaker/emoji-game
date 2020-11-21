import React from 'react';
import { Emoji } from 'emoji-mart-lite';
import styled from 'styled-components';

import './App.css';
import Container from './Container';

const HomeContainer = styled.main`
  min-height: 100vh;
  max-width: 600px;
  margin: 0 auto;
  padding: 0 0.5rem;
  font-family: inherit;
`;

export function App() {
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

export default App;
