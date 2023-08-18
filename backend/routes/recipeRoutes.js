// routes/recipeRoutes.js
const express = require('express');
const recipeController = require('../controllers/recipeController');
const authenticateToken = require('../middleware/authTokens');
const ensureAuthenticated = require('../middleware/ensureAuthenticated');
const passport = require('passport');
// const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/search', recipeController.searchRecipes);
router.post("/preference",passport.authenticate('jwt', { session: false }),recipeController.savePreference)
// router.post('/save', recipeController.saveRecipe);
// router.get('/saved', recipeController.getSavedRecipes);

module.exports = router;
