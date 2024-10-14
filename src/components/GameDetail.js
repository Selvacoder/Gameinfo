import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const GameDetail = () => {
  const { id } = useParams(); // Get the MongoDB _id from the URL
  console.log("Game ID from URL:", id);
  const [game, setGame] = useState(null); // State to store the game data
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [error, setError] = useState(null); // State for handling errors

  useEffect(() => {
    console.log("Fetching data for game ID:", id); // Debug: Check if ID is correctly passed

    // If no ID is found, immediately set an error and stop loading
    if (!id) {
      setError('Game ID is missing');
      setLoading(false);
      return;
    }

    const fetchGameDetails = async () => {
      try {
        console.log(`Fetching from: http://localhost:5000/api/games/${id}`);

        // Fetch data from the backend running on port 5000 using the MongoDB _id
        const response = await fetch(`http://localhost:5000/api/games/${id}`);

        if (!response.ok) {
          throw new Error(`Failed to fetch game details. Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched game details:", data); // Debug: Check the data fetched from the backend

        setGame(data); // Store game details in the state
      } catch (err) {
        console.error('Error fetching game details:', err);
        setError(err.message); // Set error state with the message
      } finally {
        setLoading(false); // Set loading to false once the request completes
      }
    };

    fetchGameDetails(); // Call the function to fetch game details
  }, [id]); // Re-run the effect when 'id' changes

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!game) {
    return <div>Game not found</div>;
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
