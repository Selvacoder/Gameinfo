const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const crypto = require('crypto'); // For OTP generation
const sgMail = require('@sendgrid/mail'); // For SendGrid
const app = express();
const port = 5000;

// Import Mongoose Models
const Game = require('./models/Game'); // Adjust path
const User = require('./models/User'); // User model for sign-up

app.use(cors());
app.use(express.json()); // Middleware to parse JSON

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/GameInfo')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Could not connect to MongoDB:', err));

// Set your SendGrid API key
sgMail.setApiKey('AJV8CTWL8HT28E1U6YQ5PXGY'); // Replace with your actual SendGrid API key

// Function to generate OTP
const generateOTP = () => {
  return crypto.randomBytes(3).toString('hex').toUpperCase(); // Generate 6-character OTP
};

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

    // Generate OTP
    const otp = generateOTP();

    // Save the user with the OTP
    const user = new User({
      name,
      email,
      password,
      phone,
      otp,
      isVerified: false, // Mark user as unverified until OTP is verified
    });
    await user.save();

    // Send OTP via email using SendGrid
    const msg = {
      to: email, // User's email
      from: 'selvabalaji142@gmail.com', // Your verified SendGrid email
      subject: 'Your OTP for Sign Up',
      text: `Your OTP is ${otp}`,
    };

    try {
      await sgMail.send(msg);
      res.status(201).json({ message: 'OTP sent to your email' });
    } catch (error) {
      console.error('Error sending email:', error);
      return res.status(500).json({ message: 'Failed to send OTP email' });
    }
  } catch (error) {
    console.error('Error during sign-up:', error);
    res.status(500).json({ message: 'Server error', error });
  }
});

// Route for OTP verification
app.post('/api/auth/verify-otp', async (req, res) => {
  const { email, otp } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the OTP matches (case-insensitive)
    if (user.otp === otp.toUpperCase()) {
      user.isVerified = true; // Mark user as verified
      await user.save();
      return res.status(200).json({ message: 'User verified successfully' });
    } else {
      return res.status(400).json({ message: 'Invalid OTP' });
    }
  } catch (error) {
    console.error('Error verifying OTP:', error);
    res.status(500).json({ message: 'Server error', error });
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
