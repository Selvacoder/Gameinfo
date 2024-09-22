import React from 'react';
import '../style/GameCard.css';

const GameCard = ({ name, description, image }) => (
  <div className="game-card">
    <img src={image} alt={name} className="game-image" />
    <h3>{name}</h3>
    <p>{description}</p>
    <button className="btn-view">View</button>
  </div>
);

export default GameCard;
