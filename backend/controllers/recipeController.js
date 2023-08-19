const axios = require('axios');
// backend/controllers/preferenceController.js
const Recipe = require('../models/recipe');
const User = require('../models/user');
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
    const userId = req.user.id;
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

const deletePreference = async (req, res) => {
    if (req.isAuthenticated()) {
        const userId = req.user.id;
        const {id} = req.params;

        try {
            const recipe = await Recipe.findOne({
                where: {recipeId:id,userId:userId}
            });

            if (!recipe) {
                return res.status(404).json({ message: 'Recipe not found or not authorized' });
            }

            await recipe.destroy();
            res.status(200).json({ message: 'Preference deleted successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'An error occurred while deleting preference.' });
        }
    } else {
        res.status(401).json({ message: 'Unauthorized' });
    }
};


const getPreference = async (req, res) => {
    if (req.isAuthenticated()) {
        try {
            const userId = req.user.id;
            console.log(userId)

            // Find all recipes associated with the user
            const recipes = await Recipe.findAll({
                where: {
                    userId: userId
                }
            });

            if (!recipes) {
                return res.status(404).json({ message: 'User not found' });
            }

            res.status(200).json({ recipes: recipes, message: "Your saved recipes" });
        } catch (error) {
            res.status(500).json({ message: 'Failed to get user details', error: error.message });
        }
    }
};


  

  const singleRecipe = async (req, res) => {
    if (req.isAuthenticated()) {
        try {
            const { id } = req.params;
            const apiUrls = [
                `https://api.spoonacular.com/recipes/${id}/ingredientWidget.json?apiKey=${API_KEY}`,
                `https://api.spoonacular.com/recipes/${id}/nutritionWidget.json?apiKey=${API_KEY}`,
                `https://api.spoonacular.com/recipes/${id}/tasteWidget.json?apiKey=${API_KEY}`,
               ` https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}&includeNutrition=false`
            ];

            const apiRequests = apiUrls.map(url => axios.get(url));

            const [ingredientsResponse, nutritionResponse, tasteResponse,recipeInformation] = await axios.all(apiRequests);

            return res.status(200).json({
                nutrition: nutritionResponse.data.nutrients,
                ingredients: ingredientsResponse.data.ingredients,
                taste: tasteResponse.data,
                recipeInformations:recipeInformation.data
            });
        } catch (error) {
            throw error;
        }
    }
};



module.exports = {
  searchRecipes,
  savePreference,
  singleRecipe,
  getPreference,
  deletePreference
};
