import React, { useState, useEffect } from 'react';
import GameCard from './GameCard';
import '../style/GameContainer.css';
import { useDebounce } from 'use-debounce'; // Debounce hook for efficient search

const GameContainer = ({ searchTerm, genre, developer, publisher, ratingRange }) => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const gamesPerPage = 15;
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500); // Debounce the search term

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/games');
        if (!response.ok) {
          throw new Error('Failed to fetch games');
        }
        const data = await response.json();
        setGames(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  // Filter games based on the search term and filters
  const filteredGames = games.filter(game => {
    const matchesSearchTerm = game.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase());
    const matchesGenre = genre ? game.genre === genre : true;
    const matchesDeveloper = developer ? game.developer === developer : true;
    const matchesPublisher = publisher ? game.publisher === publisher : true;
    const matchesRating = (
      (ratingRange.min ? game.rating >= ratingRange.min : true) &&
      (ratingRange.max ? game.rating <= ratingRange.max : true)
    );

    return matchesSearchTerm && matchesGenre && matchesDeveloper && matchesPublisher && matchesRating;
  });

  const totalPages = Math.ceil(filteredGames.length / gamesPerPage);

  // Reset currentPage when searchTerm or filters change
  useEffect(() => {
    setCurrentPage(0);
  }, [debouncedSearchTerm, genre, developer, publisher, ratingRange]);

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

  const handleRetry = () => {
    setLoading(true);
    setError(null);
    // Fetch the games again if there's an error
    const fetchGames = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/games');
        if (!response.ok) {
          throw new Error('Failed to fetch games');
        }
        const data = await response.json();
        setGames(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchGames();
  };

  return (
    <div className="game-card-container" aria-live="polite">
      {loading && <div className="loading-spinner" aria-live="assertive">Loading...</div>}
      {error && (
        <div className="error-message" aria-live="assertive">
          <p>Error loading games: {error}</p>
          <button onClick={handleRetry} aria-label="Retry fetching games">Retry</button>
        </div>
      )}
      {currentGames.length > 0 ? (
        currentGames.map(game => (
          <GameCard key={game._id} {...game} />
        ))
      ) : (
        !loading && (
          <div className="no-games">
            <h2>No games found</h2>
            <p>Try searching for something else.</p>
          </div>
        )
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination-controls" aria-live="polite">
          <button 
            onClick={handlePrevious} 
            disabled={currentPage === 0} 
            aria-label="Previous Page"
          >
            Previous
          </button>
          <span className="page-info" aria-live="polite">
            Page {currentPage + 1} of {totalPages}
          </span>
          <button 
            onClick={handleNext} 
            disabled={currentPage === totalPages - 1}
            aria-label="Next Page"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default GameContainer;
