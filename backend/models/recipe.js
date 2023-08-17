// models/Recipe.js
const { sequelize, DataTypes } = require('./sequelizeConnection'); // Import the Sequelize connection
const User = require('./user'); // Import the User model

const Recipe = sequelize.define('Recipe', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
Recipe.belongsTo(User); // Preference belongs to a User
User.hasMany(Recipe);    // User has many Preferences
module.exports = Recipe;
