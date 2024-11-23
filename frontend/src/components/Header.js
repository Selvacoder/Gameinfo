import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // Import useLocation
import "../style/Header.css";
import Filter from "./Filter";

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
  setSearchTerm,
  gameTitles = [], // Default to an empty array
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedDarkMode = localStorage.getItem("darkMode");
    return savedDarkMode === "true";
  });
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);

  const navigate = useNavigate();
  const location = useLocation(); // Get the current route

  // Reset search term when the route changes
  useEffect(() => {
    setSearchTerm(""); // Reset search term on location change
  }, [location, setSearchTerm]); // Dependency on location

  const handleSignInClick = () => navigate("/signin");
  const handleSignUpClick = () => navigate("/signup");
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const onApplyFilters = () => {
    applyFilters();
    setIsSidebarOpen(false);
  };

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => {
      const newDarkMode = !prevMode;
      localStorage.setItem("darkMode", newDarkMode);
      return newDarkMode;
    });
  };

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [isDarkMode]);

  // Filter suggestions with debounce effect
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchTerm) {
        const suggestions = gameTitles.filter((title) =>
          title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        // Limit to 8 suggestions
        setFilteredSuggestions(suggestions.slice(0, 8)); 
        setShowSuggestions(suggestions.length > 0); // Show suggestions only if there are any
        setActiveSuggestionIndex(-1); // Reset active suggestion index
      } else {
        setFilteredSuggestions([]);
        setShowSuggestions(false);
      }
    }, 50); // Debounce delay
  
    return () => clearTimeout(timeoutId);
  }, [searchTerm, gameTitles]);

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    setShowSuggestions(false); // Close suggestions
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      setActiveSuggestionIndex((prev) =>
        prev < filteredSuggestions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === "ArrowUp") {
      setActiveSuggestionIndex((prev) => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === "Enter") {
      if (activeSuggestionIndex >= 0) {
        setSearchTerm(filteredSuggestions[activeSuggestionIndex]);
      }
      setShowSuggestions(false);
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
    }
  };

  const renderSuggestion = (suggestion) => {
    const matchIndex = suggestion
      .toLowerCase()
      .indexOf(searchTerm.toLowerCase());
    if (matchIndex === -1) return suggestion;

    const beforeMatch = suggestion.slice(0, matchIndex);
    const matchText = suggestion.slice(
      matchIndex,
      matchIndex + searchTerm.length
    );
    const afterMatch = suggestion.slice(matchIndex + searchTerm.length);

    return (
      <>
        {beforeMatch}
        <span className="highlight">{matchText}</span>
        {afterMatch}
      </>
    );
  };

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

      <div className="search-container">
        <input
          type="text"
          placeholder="Search..."
          className="search-bar"
          aria-label="Search games"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        {showSuggestions && (
          <ul className="autocomplete-suggestions" role="listbox">
            {filteredSuggestions.map((suggestion, index) => (
              <li
                key={index}
                role="option"
                aria-selected={activeSuggestionIndex === index}
                onClick={() => handleSuggestionClick(suggestion)}
                className={`autocomplete-suggestion ${
                  activeSuggestionIndex === index ? "active" : ""
                }`}
              >
                {renderSuggestion(suggestion)}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <button
          className="btn-close"
          onClick={toggleSidebar}
          aria-label="Close Menu"
        >
          ✖
        </button>

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

        <button
          className="toggle-btn"
          onClick={toggleDarkMode}
          aria-label="Toggle Dark Mode"
        >
          {isDarkMode ? "🌙" : "☀️"} Dark Mode
        </button>
      </div>

      <div className="auth-buttons">
        {isSignedIn ? (
          <button className="btn-signout" onClick={handleSignOut}>
            Sign Out
          </button>
        ) : (
          <>
            <button className="btn-signin" onClick={handleSignInClick}>
              Sign In
            </button>
            <button className="btn-signup" onClick={handleSignUpClick}>
              Sign Up
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
