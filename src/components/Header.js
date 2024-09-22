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
    />
    <div className="auth-buttons">
      {isSignedIn ? (
        <button className="btn-signout" onClick={handleSignOut}>Sign Out</button>
      ) : (
        <>
          <button className="btn-signin" onClick={handleSignIn}>Sign In</button>
          <button className="btn-signup">Sign Up</button>
        </>
      )}
    </div>
  </div>
);

export default Header;
