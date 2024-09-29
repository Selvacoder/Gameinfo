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

  // Temporary states for filters
  const [tempSearchTerm, setTempSearchTerm] = useState('');
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
    // Update main state with temporary values
    setSearchTerm(tempSearchTerm);
    setGenre(tempGenre);
    setDeveloper(tempDeveloper);
    setPublisher(tempPublisher);
    setRatingRange(tempRatingRange);
    
    // Log applied filters
    console.log('Filters applied:', {
      searchTerm: tempSearchTerm,
      genre: tempGenre,
      developer: tempDeveloper,
      publisher: tempPublisher,
      ratingRange: tempRatingRange,
    });
  };

  return (
    <Router>
      <div className="App">
        <HeaderWrapper
          isSignedIn={isSignedIn}
          handleSignIn={handleSignIn}
          handleSignOut={handleSignOut}
          tempSearchTerm={tempSearchTerm} // Pass tempSearchTerm
          setTempSearchTerm={setTempSearchTerm} // Pass setter for tempSearchTerm
          genres={genres}
          tempGenre={tempGenre} // Pass tempGenre
          setTempGenre={setTempGenre} // Pass setter for tempGenre
          developers={developers}
          tempDeveloper={tempDeveloper} // Pass tempDeveloper
          setTempDeveloper={setTempDeveloper} // Pass setter for tempDeveloper
          publishers={publishers}
          tempPublisher={tempPublisher} // Pass tempPublisher
          setTempPublisher={setTempPublisher} // Pass setter for tempPublisher
          tempRatingRange={tempRatingRange} // Pass tempRatingRange
          setTempRatingRange={setTempRatingRange} // Pass setter for tempRatingRange
          applyFilters={applyFilters} // Pass applyFilters function
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
const HeaderWrapper = ({ 
  isSignedIn, 
  handleSignIn, 
  handleSignOut, 
  tempSearchTerm, 
  setTempSearchTerm, 
  genres, 
  tempGenre, 
  setTempGenre, 
  developers, 
  tempDeveloper, 
  setTempDeveloper, 
  publishers, 
  tempPublisher, 
  setTempPublisher, 
  tempRatingRange, 
  setTempRatingRange, 
  applyFilters 
}) => {
  const location = useLocation();
  const hideHeaderRoutes = ['/signin', '/signup', '/games/'];
  const isOnGameDetail = location.pathname.startsWith('/games/');
  const showHeader = !hideHeaderRoutes.includes(location.pathname) && !isOnGameDetail;

  return showHeader ? (
    <Header
      isSignedIn={isSignedIn}
      handleSignIn={handleSignIn}
      handleSignOut={handleSignOut}
      tempSearchTerm={tempSearchTerm} // Pass tempSearchTerm
      setTempSearchTerm={setTempSearchTerm} // Pass setter for tempSearchTerm
      genres={genres}
      tempGenre={tempGenre} // Pass tempGenre
      setTempGenre={setTempGenre} // Pass setter for tempGenre
      developers={developers}
      tempDeveloper={tempDeveloper} // Pass tempDeveloper
      setTempDeveloper={setTempDeveloper} // Pass setter for tempDeveloper
      publishers={publishers}
      tempPublisher={tempPublisher} // Pass tempPublisher
      setTempPublisher={setTempPublisher} // Pass setter for tempPublisher
      tempRatingRange={tempRatingRange} // Pass tempRatingRange
      setTempRatingRange={setTempRatingRange} // Pass setter for tempRatingRange
      applyFilters={applyFilters} // Pass down the applyFilters function
    />
  ) : null;
};

export default App;
