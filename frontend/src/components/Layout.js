import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import '../style/Layout.css';
import Footer from './Footer';

const Layout = ({
  isSignedIn,
  handleSignIn,
  handleSignOut,
  searchTerm,
  setSearchTerm,
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
  gameTitles
}) => {
  const location = useLocation();

  const hideHeaderPaths = ['/signin', '/signup', '/games/'];

  const shouldHideHeader = hideHeaderPaths.some((path) => {
    if (path === '/games/') {
      return location.pathname.startsWith('/games/');
    }
    return location.pathname === path;
  });

  return (
    <div className="layout">
      {/* Render the header only if the header should not be hidden */}
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
          gameTitles={gameTitles}
        />
      )}
      <Outlet /> {/* This will render the matching child route */}

      <Footer /> {/* Add the Footer component */}
    </div>
  );
};

export default Layout;
