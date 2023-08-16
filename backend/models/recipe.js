// models/Recipe.js
const { DataTypes } = require('sequelize');
const sequelize = require('./sequelizeConnection'); // Import the Sequelize connection

const Recipe = sequelize.define('Recipe', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Recipe;
