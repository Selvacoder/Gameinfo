import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/Header.css';

const Header = ({ isSignedIn, handleSignIn, handleSignOut, searchTerm, setSearchTerm }) => {
  const navigate = useNavigate();

  const handleSignInClick = () => {
    navigate('/signin'); // Navigate to the Sign In page
  };

  const handleSignUpClick = () => {
    navigate('/signup'); // Navigate to the Sign Up page
  };

  return (
    <div className="header">
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
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
