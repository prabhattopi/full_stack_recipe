const passport = require('passport');
const User = require('../models/user');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const login = (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, passportUser, info) => {
    if (err) {
      return next(err);
    }
  

    if (passportUser) {
      const user = passportUser;
      const token = jwt.sign({ userId:user.id}, 'your-secret-key', { expiresIn: '30d' });

      res.status(200).json({ message: 'Authentication successful', token, user });
    } else {
      res.status(400).json({ message: 'Authentication failed', info });
    }
  })(req, res, next);
};

const register = async (req, res) => {
  const {email, password } = req.body;

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      password: hashedPassword
    });

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while registering user.' });
  }
};

const logout = (req, res, next) => {
 

  req.logout(function(err) {
    if (err) {
      return next(err);
    }
    req.session.destroy(function (err) {
        if (err) { return next(err); }
        // The response should indicate that the user is no longer authenticated.
        return res.json({ message:"Logged out successfully" });
      });
  });
};

const getUser = async (req, res) => {
    try {
        const userId = req.user.id;
  
      // Find the user in the database based on the userId
      const user = await User.findByPk(userId);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Return the user details
      res.status(200).json({ user, message: "You are logged in" });
    } catch (error) {
      res.status(500).json({ message: 'Failed to get user details', error: error.message });
    }
}

  
module.exports = {
  login,
  register,
  logout,
  getUser
};
