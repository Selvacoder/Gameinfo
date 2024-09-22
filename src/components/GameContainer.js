import React from 'react';
import GameCard from './GameCard';
import '../style/GameCard.css';

const GameContainer = ({ games }) => (
  <div className="game-card-container">
    {games.map(game => (
      <GameCard key={game.id} {...game} />
    ))}
  </div>
);

export default GameContainer;
