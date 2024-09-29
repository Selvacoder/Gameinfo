import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/Header.css';
import Filter from './Filter';

const Header = ({ 
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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleSignInClick = () => {
    navigate('/signin');
  };

  const handleSignUpClick = () => {
    navigate('/signup');
  };

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const onApplyFilters = () => {
    applyFilters(); // Call applyFilters to update the main states
    setIsSidebarOpen(false); // Close the sidebar after applying filters
  };

  return (
    <div className="header">
      <button className="btn-menu" onClick={toggleSidebar} aria-label="Menu">
        ☰ 
      </button>

      <input
        type="text"
        placeholder="Search..."
        value={tempSearchTerm} // Use temporary search term
        onChange={(e) => setTempSearchTerm(e.target.value)} // Update temporary search term
        className="search-bar"
        aria-label="Search games"
      />

      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <button className="btn-close" onClick={toggleSidebar} aria-label="Close Menu">✖</button>
        
        <Filter 
          genres={genres}
          tempGenre={tempGenre} // Use temporary genre
          setTempGenre={setTempGenre} // Pass setter for temporary genre
          developers={developers}
          tempDeveloper={tempDeveloper} // Use temporary developer
          setTempDeveloper={setTempDeveloper} // Pass setter for temporary developer
          publishers={publishers}
          tempPublisher={tempPublisher} // Use temporary publisher
          setTempPublisher={setTempPublisher} // Pass setter for temporary publisher
          tempRatingRange={tempRatingRange} // Use temporary rating range
          setTempRatingRange={setTempRatingRange} // Pass setter for temporary rating range
          onApplyFilters={onApplyFilters} // Pass down the function
        />
      </div>

      <div className="auth-buttons">
        {isSignedIn ? (
          <button className="btn-signout" onClick={handleSignOut}>Sign Out</button>
        ) : (
          <>
            <button className="btn-signin" onClick={handleSignInClick}>Sign In</button>
            <button className="btn-signup" onClick={handleSignUpClick}>Sign Up</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
