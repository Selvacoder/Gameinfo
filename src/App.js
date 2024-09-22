import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import GameContainer from './components/GameContainer';
import games from './data/gameData';  // Import game data from external file

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Filter games based on search term
  const filteredGames = games.filter(game =>
    game.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="App">
      <Header
        isSignedIn={isSignedIn}
        handleSignIn={() => setIsSignedIn(true)}
        handleSignOut={() => setIsSignedIn(false)}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <GameContainer games={filteredGames} />
    </div>
  );
}

export default App;
