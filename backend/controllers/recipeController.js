const axios = require('axios');
// backend/controllers/preferenceController.js
const Recipe = require('../models/recipe');
const ensureAuthenticated = require('../middleware/ensureAuthenticated');
const API_KEY = process.env.API_KEY;

const searchRecipes = async (req,res) => {
  try {
      const {query,number}=req.query
      if(!number){
          number=10
      }
    const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&query=${query}&number=${number}`);
    return res.status(200).json({data:response.data.results})
  } catch (error) {
    throw error;
  }
};


const savePreference = async (req, res) => {
  if (req.isAuthenticated()) {
    const userId = req.user.id;
    const { recipeId } = req.body;

    try {
      await Recipe.create({
        userId,
        recipeId
      });
      res.json({ message: 'Preference saved successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while saving preference.' });
    }
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
};



module.exports = {
  searchRecipes,
  savePreference
};
