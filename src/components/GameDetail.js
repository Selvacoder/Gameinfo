import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const GameDetail = () => {
  const { id } = useParams(); // Get the ID from the URL
  const [game, setGame] = useState(null); // State to store the game data
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [error, setError] = useState(null); // State for handling errors

  useEffect(() => {
    // Fetch game data from the Node.js API
    const fetchGameDetails = async () => {
      try {
        const response = await fetch(`/api/games/${id}`); // Use relative path with proxy
        if (!response.ok) {
          throw new Error('Game not found');
        }
        const data = await response.json();
        setGame(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGameDetails();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>; // Show a loading message while fetching data
  }

  if (error) {
    return <div>{error}</div>; // Show error message if something goes wrong
  }

  if (!game) {
    return <div>Game not found</div>; // Handle case where no game is found
  }

  return (
    <div className="game-detail">
      <h1>{game.name}</h1>
      {game.image ? <img src={game.image} alt={game.name} /> : <p>No image available</p>}
      <p>{game.description}</p>
      <p><strong>Genre:</strong> {game.genre || 'N/A'}</p>
      <p><strong>Release Date:</strong> {game.releaseDate || 'N/A'}</p>
      <p><strong>Rating:</strong> {game.rating || 'N/A'}</p>
      <p><strong>Developer:</strong> {game.developer || 'N/A'}</p>
      <p><strong>Publisher:</strong> {game.publisher || 'N/A'}</p>
    </div>
  );
};

export default GameDetail;
