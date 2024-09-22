import React from 'react';
import GameCard from './GameCard';
import '../style/GameContainer.css';

const GameContainer = ({ games, isLoading, error }) => {
  return (
    <div className="game-card-container" aria-live="polite">
      {isLoading && <h2 aria-live="assertive">Loading games...</h2>}
      {error && <h2 className="error-message" aria-live="assertive">Error loading games: {error}</h2>}
      {games.length > 0 ? (
        games.map(game => (
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
    </div>
  );
};

export default GameContainer;
