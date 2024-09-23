import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/Header.css';

const Header = ({ isSignedIn, handleSignIn, handleSignOut, searchTerm, setSearchTerm, genres, setGenre, developers, setDeveloper, publishers, setPublisher, ratingRange, setRatingRange }) => {
  const navigate = useNavigate();

  const handleSignInClick = () => {
    navigate('/signin'); // Navigate to the Sign In page
  };

  const handleSignUpClick = () => {
    navigate('/signup'); // Navigate to the Sign Up page
  };

  const handleMenuClick = () => {
    // Functionality for menu button can be implemented here
    console.log("Menu button clicked");
  };

  return (
    <div className="header">
      <button className="btn-menu" onClick={handleMenuClick} aria-label="Menu">
        ☰ {/* Menu icon, can be replaced with an icon from a library */}
      </button>

      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
        aria-label="Search games"
      />

      {/* Filter by Genre */}
      <select onChange={(e) => setGenre(e.target.value)} className="filter" aria-label="Select genre">
        <option value="">Select Genre</option>
        {genres.map((genre) => (
          <option key={genre} value={genre}>{genre}</option>
        ))}
      </select>

      {/* Filter by Developer */}
      <select onChange={(e) => setDeveloper(e.target.value)} className="filter" aria-label="Select developer">
        <option value="">Select Developer</option>
        {developers.map((developer) => (
          <option key={developer} value={developer}>{developer}</option>
        ))}
      </select>

      {/* Filter by Publisher */}
      <select onChange={(e) => setPublisher(e.target.value)} className="filter" aria-label="Select publisher">
        <option value="">Select Publisher</option>
        {publishers.map((publisher) => (
          <option key={publisher} value={publisher}>{publisher}</option>
        ))}
      </select>

      {/* Filter by Rating Range */}
      <input
        type="number"
        placeholder="Min Rating"
        value={ratingRange.min}
        onChange={(e) => setRatingRange({ ...ratingRange, min: e.target.value })}
        className="filter"
        aria-label="Minimum rating"
      />
      <input
        type="number"
        placeholder="Max Rating"
        value={ratingRange.max}
        onChange={(e) => setRatingRange({ ...ratingRange, max: e.target.value })}
        className="filter"
        aria-label="Maximum rating"
      />

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
