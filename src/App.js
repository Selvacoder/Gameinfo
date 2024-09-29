import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

  // Temporary states for filters
  const [tempGenre, setTempGenre] = useState('');
  const [tempDeveloper, setTempDeveloper] = useState('');
  const [tempPublisher, setTempPublisher] = useState('');
  const [tempRatingRange, setTempRatingRange] = useState({ min: '', max: '' });

  const genres = ['Action', 'Adventure', 'RPG', 'Strategy'];
  const developers = ['Dev A', 'Dev B', 'Dev C'];
  const publishers = ['Publisher A', 'Publisher B', 'Publisher C'];

  const handleSignIn = () => setIsSignedIn(true);
  const handleSignOut = () => setIsSignedIn(false);

  const applyFilters = () => {
    setGenre(tempGenre);
    setDeveloper(tempDeveloper);
    setPublisher(tempPublisher);
    setRatingRange(tempRatingRange);
    
    // Log applied filters
    console.log('Filters applied:', {
      searchTerm,
      genre: tempGenre,
      developer: tempDeveloper,
      publisher: tempPublisher,
      ratingRange: tempRatingRange,
    });
  };

  return (
    <Router>
      <div className="App">
        <Header
          isSignedIn={isSignedIn}
          handleSignIn={handleSignIn}
          handleSignOut={handleSignOut}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          genres={genres}
          tempGenre={tempGenre}
          setTempGenre={setTempGenre}
          developers={developers}
          tempDeveloper={tempDeveloper}
          setTempDeveloper={setTempDeveloper}
          publishers={publishers}
          tempPublisher={tempPublisher}
          setTempPublisher={setTempPublisher}
          tempRatingRange={tempRatingRange}
          setTempRatingRange={setTempRatingRange}
          applyFilters={applyFilters}
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

export default App;
