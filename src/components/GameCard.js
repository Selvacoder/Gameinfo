import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/GameCard.css';

const GameCard = ({ name, description, image, id }) => {
  const navigate = useNavigate();

  const handleViewClick = () => {
    navigate(`/games/${id}`); // Navigate to the game details page
  };

  const placeholderImage = 'https://via.placeholder.com/150'; // Example placeholder

  return (
    <div className="game-card">
      <img src={image || placeholderImage} alt={name} className="game-image" />
      <h3>{name}</h3>
      <p>{description}</p>
      <button className="btn-view" onClick={handleViewClick}>
        View
      </button>
    </div>
  );
};

export default GameCard;
