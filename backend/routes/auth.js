const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const twilio = require('twilio');
const bcrypt = require('bcryptjs');

// Twilio setup
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = new twilio(accountSid, authToken);

// Generate a random OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// User sign-up
router.post('/signup', async (req, res) => {
  const { name, email, password, phone } = req.body;
  try {
    // Check if the user already exists
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: 'User already exists' });

    // Create a new user
    user = new User({ name, email, password, phone });

    // Save the user
    await user.save();

    // Generate OTP
    const otp = generateOTP();
    user.otp = otp;

    // Send OTP to user's phone
    await client.messages.create({
      body: `Your OTP is ${otp}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phone,
    });

    await user.save();
    res.json({ msg: 'User registered. OTP sent to phone number.' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Verify OTP
router.post('/verify-otp', async (req, res) => {
  const { email, otp } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'User not found' });

    if (user.otp === otp) {
      user.isVerified = true;
      user.otp = null;
      await user.save();
      res.json({ msg: 'OTP verified. User is signed up successfully!' });
    } else {
      res.status(400).json({ msg: 'Invalid OTP' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
