import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import GameContainer from './components/GameContainer';
import GameDetail from './components/GameDetail';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [genre, setGenre] = useState('');
  const [developer, setDeveloper] = useState('');
  const [publisher, setPublisher] = useState('');
  const [ratingRange, setRatingRange] = useState({ min: '', max: '' });

  // Example arrays for genres, developers, and publishers
  const genres = ['Action', 'Adventure', 'RPG', 'Strategy']; // Update this based on your data
  const developers = ['Dev A', 'Dev B', 'Dev C']; // Update this based on your data
  const publishers = ['Publisher A', 'Publisher B', 'Publisher C']; // Update this based on your data

  const handleSignIn = () => setIsSignedIn(true);
  const handleSignOut = () => setIsSignedIn(false);

  return (
    <Router>
      <div className="App">
        <HeaderWrapper
          isSignedIn={isSignedIn}
          handleSignIn={handleSignIn}
          handleSignOut={handleSignOut}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          genres={genres}
          setGenre={setGenre}
          developers={developers}
          setDeveloper={setDeveloper}
          publishers={publishers}
          setPublisher={setPublisher}
          ratingRange={ratingRange}
          setRatingRange={setRatingRange}
        />

        <Routes>
          <Route path="/" element={<GameContainer 
            searchTerm={searchTerm} 
            genre={genre} 
            developer={developer} 
            publisher={publisher} 
            ratingRange={ratingRange} 
          />} />
          <Route path="/games/:id" element={<GameDetail />} />
          <Route path="/signin" element={<SignIn handleSignIn={handleSignIn} />} />
          <Route path="/signup" element={<SignUp handleSignIn={handleSignIn} />} />
        </Routes>
      </div>
    </Router>
  );
}

// Wrapper for the Header that hides it on the SignIn, SignUp, and GameDetail pages
const HeaderWrapper = ({ isSignedIn, handleSignIn, handleSignOut, searchTerm, setSearchTerm, genres, setGenre, developers, setDeveloper, publishers, setPublisher, ratingRange, setRatingRange }) => {
  const location = useLocation();
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
      genres={genres}
      setGenre={setGenre}
      developers={developers}
      setDeveloper={setDeveloper}
      publishers={publishers}
      setPublisher={setPublisher}
      ratingRange={ratingRange}
      setRatingRange={setRatingRange}
    />
  ) : null;
};

export default App;
