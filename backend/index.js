require("dotenv").config();
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy
const bcrypt =require("bcrypt")
const User=require("./models/user")
const authRoutes = require('./routes/authRoutes');
const recipeRoutes = require('./routes/recipeRoutes');
const {connectDB, sequelize }=require("./models/sequelizeConnection")


const app = express();

// Configure Passport.js
passport.use(new LocalStrategy(
        {
          usernameField: 'email',
          passwordField: 'password'
        },
        async (email, password, done) => {
          try {
            const user = await User.findOne({ where: { email } });
            if (!user) {
              return done(null, false, { message: 'Invalid email or password' });
            }
      
            // Compare hashed password
            const passwordsMatch = await bcrypt.compare(password, user.password);
            if (!passwordsMatch) {
              return done(null, false, { message: 'Invalid email or password' });
            }
      
            return done(null, user);
          } catch (error) {
            return done(error);
          }
        }
      
  ));

app.use(session({ secret: 'your-secret-key', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());
app.use(express.json())

app.use('/api/auth', authRoutes);
app.use('/api/recipes', recipeRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
    console.log("🚀Server started Successfully");
    await connectDB();
    sequelize.sync({ force: false }).then(() => {
      console.log("✅Synced database successfully...");
    });
  });