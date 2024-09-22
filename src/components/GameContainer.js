import React, { useState, useEffect } from 'react';
import GameCard from './GameCard';
import '../style/GameContainer.css';

const GameContainer = ({ games, isLoading, error, searchTerm }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const gamesPerPage = 15;

  // Filter games based on the search term
  const filteredGames = games.filter(game =>
    game.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredGames.length / gamesPerPage);

  // Reset currentPage when searchTerm changes
  useEffect(() => {
    setCurrentPage(0);
  }, [searchTerm]);

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Determine which games to display on the current page
  const currentGames = filteredGames.slice(currentPage * gamesPerPage, (currentPage + 1) * gamesPerPage);

  return (
    <div className="game-card-container" aria-live="polite">
      {isLoading && <h2 aria-live="assertive">Loading games...</h2>}
      {error && <h2 className="error-message" aria-live="assertive">Error loading games: {error}</h2>}
      {currentGames.length > 0 ? (
        currentGames.map(game => (
          <GameCard key={game.id} {...game} />
        ))
      ) : (
        !isLoading && (
          <div className="no-games">
            <h2>No games found</h2>
            <p>Try searching for something else.</p>
          </div>
        )
      )}
      <div className="pagination-controls">
        <button onClick={handlePrevious} disabled={currentPage === 0}>
          Previous
        </button>
        <button onClick={handleNext} disabled={currentPage === totalPages - 1}>
          Next
        </button>
      </div>
    </div>
  );
};

export default GameContainer;
