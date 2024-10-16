const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const app = express();
const port = 5000;

// Import Mongoose Models
const Game = require('./models/Game'); // Adjust path
const User = require('./models/User'); // User model for sign-up and sign-in

app.use(cors());
app.use(express.json()); // Middleware to parse JSON

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/GameInfo')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Could not connect to MongoDB:', err));

// Serve static images
app.use('/images', express.static(path.join(__dirname, 'images')));

// Route for sign-up
app.post('/api/auth/signup', async (req, res) => {
  const { name, email, password, phone } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Save the new user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      phone,
    });
    await user.save();

    res.json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('Error during sign-up:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Route for sign-in
app.post('/api/auth/signin', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // If successful
    res.json({ message: 'Sign-in successful' });
  } catch (err) {
    console.error('Error during sign-in:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Route to get a game by ID
app.get('/api/games/:id', async (req, res) => {
  try {
    const gameId = req.params.id;
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

    if (genre) {
      query.genre = genre;
    }

    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }

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
