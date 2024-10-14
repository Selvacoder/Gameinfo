import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../style/GameDetail.css'; // Import the CSS file

const GameDetail = () => {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/games/${id}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch game details. Status: ${response.status}`);
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
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!game) {
    return <div>Game not found</div>;
  }

  const placeholderImage = 'https://via.placeholder.com/300';
  const gameImage = game.image ? `http://localhost:5000/images/${game.image}` : placeholderImage;

  return (
    <div className="game-detail">
      <div className="game-detail-basic">
        <img src={gameImage} alt={game.name} />
        <div className="game-detail-content">
          <h1>{game.name}</h1>
          <p>{game.description}</p>
          <p><strong>Genre:</strong> {game.genre || 'N/A'}</p>
          <p><strong>Release Date:</strong> {game.releaseDate || 'N/A'}</p>
          <p><strong>Rating:</strong> {game.rating || 'N/A'}</p>
          <p><strong>Developer:</strong> {game.developer || 'N/A'}</p>
          <p><strong>Publisher:</strong> {game.publisher || 'N/A'}</p>
        </div>
      </div>

      {/* Additional Data Sections - full-width */}
      <div className="game-detail-extra">
        <h2>Story</h2>
        <p>{game.story || 'No story available.'}</p>
      </div>
      <div className="game-detail-extra">
        <h2>Gameplay</h2>
        <p>{game.gameplay || 'No gameplay information available.'}</p>
      </div>
      <div className="game-detail-extra">
        <h2>Main Character</h2>
        <p>{game.main_character || 'No main character information available.'}</p>
      </div>
      <div className="game-detail-extra">
        <h2>World</h2>
        <p>{game.world || 'No world information available.'}</p>
      </div>
      <div className="game-detail-extra">
        <h2>Unique Feature</h2>
        <p>{game.unique_feature || 'No unique feature available.'}</p>
      </div>
    </div>
  );
};

export default GameDetail;
