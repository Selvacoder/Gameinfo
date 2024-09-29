// Layout.js
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import '../style/Layout.css';

const Layout = ({ isSignedIn, handleSignIn, handleSignOut, searchTerm, setSearchTerm, genres, tempGenre, setTempGenre, developers, tempDeveloper, setTempDeveloper, publishers, tempPublisher, setTempPublisher, tempRatingRange, setTempRatingRange, applyFilters }) => {
  const location = useLocation();

  // Define the paths where the header should be hidden
  const hideHeaderPaths = ['/signin', '/signup'];

  // Check if the current path is in the hideHeaderPaths or if it matches the GameDetail pattern
  const shouldHideHeader = hideHeaderPaths.some(path => location.pathname.includes(path)) || location.pathname.startsWith('/games/');

  return (
    <div className="layout">
      {!shouldHideHeader && (
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
      )}
      <Outlet /> {/* This will render the matching child route */}
    </div>
  );
};

export default Layout;
