import React from 'react';
import './App.css';

const Header = () => (
  <div className="header">
    <input type="text" placeholder="Search..." className="search-bar" />
    <div className="auth-buttons">
      <button className="btn-signin">Sign In</button>
      <button className="btn-signup">Sign Up</button>
    </div>
  </div>
);

const GameCard = ({ image, name }) => (
  <div className="game-card">
    <img src={image} alt={name} className="game-image" />
    <h3>{name}</h3>
    <button className="btn-view">View</button>
  </div>
);

function App() {
  const games = [
    // Replace these with actual game images and names
    { id: 1, name: 'Game 1', image: 'game1.jpg' },
    { id: 2, name: 'Game 2', image: 'game2.jpg' },
    { id: 3, name: 'Game 3', image: 'game3.jpg' },
  ];

  return (
    <div className="App">
      <Header />
      <div className="game-card-container">
        {games.map(game => (
          <GameCard key={game.id} {...game} />
        ))}
      </div>
    </div>
  );
}

export default App;
