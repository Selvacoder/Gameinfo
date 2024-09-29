const express = require('express');
const cors = require('cors'); 
const mongoose = require('mongoose');
const app = express();
const port = 5000;

// Import Mongoose Game model
const Game = require('./models/Game'); // Adjust path based on where the model is stored

app.use(cors());
app.use(express.json()); // Middleware to parse JSON

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/GameInfo')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Could not connect to MongoDB:', err));

// Route to get a game by ID
app.get('/api/games/:id', async (req, res) => {
  try {
    const gameId = req.params.id;

    // Find the game by its ID from MongoDB
    const game = await Game.findById(gameId);

    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }

    res.json(game);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
});

// Route to get all games
app.get('/api/games', async (req, res) => {
  try {
    const { search, genre } = req.query;

    let query = {};

    // Filter by genre if provided
    if (genre) {
      query.genre = genre;
    }

    // Filter by search term if provided
    if (search) {
      query.name = { $regex: search, $options: 'i' }; // Case-insensitive search
    }

    // Fetch games from MongoDB
    const games = await Game.find(query);

    res.json(games);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
