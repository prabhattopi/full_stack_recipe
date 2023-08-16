const express = require('express');
const cors = require('cors');
// const authRoutes = require('./routes/authRoutes');
// const recipeRoutes = require('./routes/recipeRoutes');
const sequelize = require('./models/sequelizeConnection'); // Import Sequelize connection

const app = express();

app.use(cors());
app.use(express.json())

// app.use('/auth', authRoutes);
// app.use('/recipes', recipeRoutes);

const PORT = process.env.PORT || 3000;
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
