const axios = require('axios');
// backend/controllers/preferenceController.js
const Recipe = require('../models/recipe');
const API_KEY = process.env.API_KEY;
const searchRecipes = async (req,res) => {
  try {
      const {query,number}=req.query
      if(!number){
          number=10
      }
    const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&query=${query}&number=${number}`);
    console.log(response.data)
    return res.status(200).json({data:response.data.results})
  } catch (error) {
    throw error;
  }
};


const savePreference = async (req, res) => {
  if (req.isAuthenticated()) {
    const userId = req.userId;
    const { recipeId,image,imageType,title } = req.body;

    try {
      await Recipe.create({
       recipeId,image,title,imageType,userId
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

const getPreference = async (req, res) => {
    if (req.isAuthenticated()) {
      const userId = req.userId;
      const { id,image,imageType,title } = req.body;
  
      try {
        await Recipe.create({
          id,image,title,imageType,userId
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
  

const singleRecipe = async (req, res) => {
    if (req.isAuthenticated()) {
        try {
            const {id}=req.params
          const ingredientsResponse = await axios.get(`https://api.spoonacular.com/recipes/${id}/ingredientWidget.json`);
          const nutritionResponse = await axios.get(`https://api.spoonacular.com/recipes/${id}/nutritionWidget.json`);
          const tasteResponse = await axios.get(` https://api.spoonacular.com/recipes/${id}/tasteWidget.json`);

  

        
          return res.status(200).json({nutrition:nutritionResponse.nutrients,ingredients:ingredientsResponse.ingredients,taste:tasteResponse})
        } catch (error) {
          throw error;
        }
    }
  };



module.exports = {
  searchRecipes,
  savePreference,
  singleRecipe
};
