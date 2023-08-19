// routes/recipeRoutes.js
const express = require('express');
const recipeController = require('../controllers/recipeController');
const passport = require('passport');
const router = express.Router();
router.get("/search",passport.authenticate('jwt', { session: false }),recipeController.searchRecipes);
router.post("/preference",passport.authenticate('jwt', { session: false }),recipeController.savePreference)
router.get("/preference",passport.authenticate('jwt', { session: false }),recipeController.getPreference)
router.get("/single/:id",passport.authenticate('jwt', { session: false }),recipeController.singleRecipe)
router.delete("/preference/:id",passport.authenticate('jwt', { session: false }),recipeController.deletePreference)
// router.get('/saved', recipeController.getSavedRecipes);

module.exports = router;
