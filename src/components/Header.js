import React from 'react';
import '../style/Header.css';

const Header = ({ isSignedIn, handleSignIn, handleSignOut, searchTerm, setSearchTerm }) => (
  <div className="header">
    <input
      type="text"
      placeholder="Search..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="search-bar"
      aria-label="Search games"
    />
    <div className="auth-buttons">
      {isSignedIn ? (
        <button className="btn-signout" onClick={handleSignOut} aria-label="Sign out">
          Sign Out
        </button>
      ) : (
        <>
          <button className="btn-signin" onClick={handleSignIn} aria-label="Sign in">
            Sign In
          </button>
          <button className="btn-signup" aria-label="Sign up">Sign Up</button>
        </>
      )}
    </div>
  </div>
);

export default Header;
