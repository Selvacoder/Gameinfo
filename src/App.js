import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import GameContainer from './components/GameContainer';
import GameDetail from './components/GameDetail'; // Import the GameDetail component
import games from './data/gameData';  // Import game data from external file

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Filter games based on search term
  const filteredGames = games.filter(game =>
    game.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Router>
      <div className="App">
        <HeaderWrapper
          isSignedIn={isSignedIn}
          handleSignIn={() => setIsSignedIn(true)}
          handleSignOut={() => setIsSignedIn(false)}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        <Routes>
          <Route 
            path="/" 
            element={
              <GameContainer 
                games={filteredGames.length > 0 ? filteredGames : []} 
                noResults={filteredGames.length === 0 && searchTerm.length > 0}
              />
            } 
          />
          <Route path="/games/:id" element={<GameDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

// HeaderWrapper component to conditionally render Header
const HeaderWrapper = ({ isSignedIn, handleSignIn, handleSignOut, searchTerm, setSearchTerm }) => {
  const location = useLocation();

  // Check if the current path is the game detail page
  const showHeader = !location.pathname.startsWith('/games/');

  return showHeader ? (
    <Header
      isSignedIn={isSignedIn}
      handleSignIn={handleSignIn}
      handleSignOut={handleSignOut}
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
    />
  ) : null;
};

export default App;
