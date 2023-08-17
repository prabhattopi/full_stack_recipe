const axios = require('axios');

const API_KEY = process.env.API_KEY;

const searchRecipes = async (req,res) => {
  try {
      const {query,number}=req.query
      if(!number){
          number=10
      }
    const response = await axios.get(`https://api.spoonacular.com/recipes/autocomplete?apiKey=${API_KEY}&query=${query}&number=${number}`);
    console.log(response.data)
    return res.status(200).json({data:response.data})
  } catch (error) {
    throw error;
  }
};

module.exports = {
  searchRecipes,
};
