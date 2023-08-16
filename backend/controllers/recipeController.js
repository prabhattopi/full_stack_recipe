const axios = require('axios');

const API_KEY = 'YOUR_SPOONACULAR_API_KEY';

const searchRecipes = async (query) => {
  try {
    const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch`, {
      params: {
        apiKey: API_KEY,
        query: query,
      },
    });
    return response.data.results;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  searchRecipes,
};
