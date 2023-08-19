// models/Recipe.js
const { sequelize, DataTypes,models } = require('./sequelizeConnection'); // Import the Sequelize connection
const User = require('./user'); // Import the User model

const Recipe = sequelize.define('Recipe', {
    recipeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
    },
    userId:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    image: {
        type: DataTypes.STRING, // Adjust the data type as needed
        allowNull: true // Depending on your requirements
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    imageType: {
        type: DataTypes.STRING, // Adjust the data type as needed
        allowNull: true // Depending on your requirements
    },
   
    // Add other fields here
});





module.exports = Recipe;
