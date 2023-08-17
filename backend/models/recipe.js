// models/Recipe.js
const { sequelize, DataTypes } = require('./sequelizeConnection'); // Import the Sequelize connection

const Recipe = sequelize.define('Recipe', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Recipe;
