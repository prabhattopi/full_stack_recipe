// models/User.js
const { sequelize, DataTypes } = require('./sequelizeConnection');
const Recipe=require("./recipe")
const User = sequelize.define('User', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});




module.exports = User;
