const express = require('express');
const cors = require('cors'); 
const path = require('path');
const app = express();
const port = 5000;

app.use(cors());

// Import the game data
const games = require(path.join(__dirname, 'data', 'gameData'));
const extraGameData = require(path.join(__dirname, 'data', 'addtionalData'));

// Route to get game by ID
app.get('/api/games/:id', (req, res) => {
  const gameId = req.params.id;

  const game = games.find(game => game.id === gameId);
  const extraData = extraGameData.find(data => data.id === gameId);

  if (!game) {
    return res.status(404).json({ message: 'Game not found' });
  }

  const fullGameDetails = { ...game, ...extraData };
  res.json(fullGameDetails);
});

// Route to get all games
app.get('/api/games', (req, res) => {
  const fullGamesList = games.map(game => {
    const extraData = extraGameData.find(data => data.id === game.id) || {};
    return { ...game, ...extraData };
  });
  res.json(fullGamesList);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

app.get('/api/games', (req, res) => {
  const { search, genre } = req.query;

  let filteredGames = games;

  // Filter by genre if provided
  if (genre) {
    filteredGames = filteredGames.filter(game => game.genre === genre);
  }

  // Filter by search term if provided
  if (search) {
    filteredGames = filteredGames.filter(game =>
      game.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  res.json(filteredGames);
});

