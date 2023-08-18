// models/Recipe.js
const { sequelize, DataTypes } = require('./sequelizeConnection'); // Import the Sequelize connection
const User = require('./user'); // Import the User model

const Recipe = sequelize.define('Recipe', {
    recipeId: {
        type: DataTypes.INTEGER,
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
    }
    // Add other fields here
});

Recipe.belongsTo(User); // A Recipe belongs to a User
User.hasMany(Recipe);    // A User has many Recipes

module.exports = Recipe;
