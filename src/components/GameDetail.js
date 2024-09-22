import React from 'react';
import { useParams } from 'react-router-dom';
import games from '../data/gameData'; // Import existing game data
import extraGameData from '../data/addtionalData'; // Import extra game data

const GameDetail = () => {
  const { id } = useParams(); // Get the ID from the URL

  const game = games.find(game => game.id === id); // Find game by ID
  const extraData = extraGameData.find(data => data.id === id); // Find extra data by ID

  if (!game) {
    return <div>Game not found</div>; // Handle case where game is not found
  }

  const fullGameDetails = { ...game, ...extraData }; // Merge data
  return (
    <div className="game-detail">
      <h1>{fullGameDetails.name}</h1>
      <img src={fullGameDetails.image} alt={fullGameDetails.name} />
      <p>{fullGameDetails.description}</p>
      <p><strong>Genre:</strong> {fullGameDetails.genre || 'N/A'}</p>
      <p><strong>Release Date:</strong> {fullGameDetails.releaseDate || 'N/A'}</p>
      <p><strong>Rating:</strong> {fullGameDetails.rating || 'N/A'}</p>
      <p><strong>Developer:</strong> {fullGameDetails.developer || 'N/A'}</p>
      <p><strong>Publisher:</strong> {fullGameDetails.publisher || 'N/A'}</p>
    </div>
  );
};

export default GameDetail;
