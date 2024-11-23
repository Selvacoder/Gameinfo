import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/Header.css';
import Filter from './Filter';

const Header = ({ 
  isSignedIn, 
  handleSignIn, 
  handleSignOut, 
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
  applyFilters,
  searchTerm,
  setSearchTerm
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Get dark mode preference from localStorage when the component mounts
    const savedDarkMode = localStorage.getItem('darkMode');
    return savedDarkMode === 'true'; // Return true or false based on saved preference
  });

  const navigate = useNavigate();

  // Handle sign in and sign up
  const handleSignInClick = () => navigate('/signin');
  const handleSignUpClick = () => navigate('/signup');

  // Toggle sidebar visibility
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  // Apply filters and close sidebar
  const onApplyFilters = () => {
    applyFilters();
    setIsSidebarOpen(false);
  };

  // Toggle dark mode and store in localStorage
  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => {
      const newDarkMode = !prevMode;
      // Save the new dark mode preference to localStorage
      localStorage.setItem('darkMode', newDarkMode);
      return newDarkMode;
    });
  };

  // Apply dark mode class to body whenever isDarkMode changes
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  return (
    <div className="header">
      <button 
        className="btn-menu" 
        onClick={toggleSidebar} 
        aria-label="Menu" 
        aria-expanded={isSidebarOpen}
      >
        ☰ 
      </button>

      <input
        type="text"
        placeholder="Search..."
        className="search-bar"
        aria-label="Search games"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <button className="btn-close" onClick={toggleSidebar} aria-label="Close Menu">✖</button>
        
        <Filter 
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
          onApplyFilters={onApplyFilters}
        />
        
        {/* Dark Mode Toggle Inside Sidebar */}
        <button 
          className="toggle-btn" 
          onClick={toggleDarkMode} 
          aria-label="Toggle Dark Mode"
        >
          {isDarkMode ? '🌙' : '☀️'} Dark Mode
        </button>
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
