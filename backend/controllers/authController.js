// backend/controllers/authController.js
const passport = require('passport');
const User = require('../models/user');

exports.login = (req, res) => {
  // User is authenticated via Passport middleware
  res.json({ message: 'Login successful' });
};

exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = await User.create({ username, password,email });
    res.json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while registering user.' });
  }
};
