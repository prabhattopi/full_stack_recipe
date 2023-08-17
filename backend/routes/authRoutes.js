// backend/routes/authRoutes.js
const express = require('express');
const passport = require('passport');
const authController = require('../controllers/authController');
const router = express.Router();

router.post('/login', passport.authenticate('local'), authController.login);
router.post('/register', authController.register);

module.exports = router;
