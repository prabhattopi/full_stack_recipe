// routes/recipeRoutes.js
const express = require('express');
const recipeController = require('../controllers/recipeController');
const ensureAuthenticated = require('../middleware/ensureAuthenticated');
// const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/search', recipeController.searchRecipes);
router.post("/preference",ensureAuthenticated,recipeController.savePreference)
// router.post('/save', recipeController.saveRecipe);
// router.get('/saved', recipeController.getSavedRecipes);

module.exports = router;
