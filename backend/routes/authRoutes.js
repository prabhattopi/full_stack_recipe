// backend/routes/authRoutes.js
const express = require('express');
const passport = require('passport');
const authController = require('../controllers/authController');
const ensureAuthenticated = require('../middleware/ensureAuthenticated');
const router = express.Router();

router.post('/login', authController.login);
router.post('/register', authController.register);
// Get user details route
router.get('/',passport.authenticate('jwt', { session: false }),authController.getUser);
router.get('/logout',authController.logout);


module.exports = router;
