import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import GameContainer from './components/GameContainer';
import GameDetail from './components/GameDetail';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import games from './data/gameData';

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSignIn = () => setIsSignedIn(true);
  const handleSignOut = () => setIsSignedIn(false);

  // Filter games based on search term
  const filteredGames = games.filter(game =>
    game.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Router>
      <div className="App">
        <HeaderWrapper
          isSignedIn={isSignedIn}
          handleSignIn={handleSignIn}
          handleSignOut={handleSignOut}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        <Routes>
          <Route 
            path="/" 
            element={<GameContainer 
            games={filteredGames} 
            isLoading={false} 
            error={null} 
            searchTerm={searchTerm} // Ensure this is passed correctly
            />}
          />
          <Route path="/" element={<GameContainer games={games} searchTerm={searchTerm} />} />
          <Route path="/games/:id" element={<GameDetail />} />
          <Route path="/signin" element={<SignIn handleSignIn={handleSignIn} />} />
          <Route path="/signup" element={<SignUp handleSignIn={handleSignIn} />} />
        </Routes>
      </div>
    </Router>
  );
}

// Wrapper for the Header that hides it on the SignIn, SignUp, and GameDetail pages
const HeaderWrapper = ({ isSignedIn, handleSignIn, handleSignOut, searchTerm, setSearchTerm }) => {
  const location = useLocation();

  // Conditionally hide the header on the SignIn, SignUp, and GameDetail pages
  const hideHeaderRoutes = ['/signin', '/signup', '/games/'];
  const isOnGameDetail = location.pathname.startsWith('/games/');
  const showHeader = !hideHeaderRoutes.includes(location.pathname) && !isOnGameDetail;

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
