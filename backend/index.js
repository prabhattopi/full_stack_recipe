require("dotenv").config();
const express = require('express');
const cors = require('cors');
// const authRoutes = require('./routes/authRoutes');
const recipeRoutes = require('./routes/recipeRoutes');
const {connectDB, sequelize }=require("./models/sequelizeConnection")
const app = express();

app.use(cors());
app.use(express.json())

// app.use('/auth', authRoutes);
app.use('/api/recipes', recipeRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
    console.log("🚀Server started Successfully");
    await connectDB();
    sequelize.sync({ force: false }).then(() => {
      console.log("✅Synced database successfully...");
    });
  });