require("dotenv").config();
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require("bcrypt")
const User = require("./models/user")
const authRoutes = require('./routes/authRoutes');
const recipeRoutes = require('./routes/recipeRoutes');
const { connectDB, sequelize } = require("./models/sequelizeConnection")
const passportJWT = require("passport-jwt");

const ExtractJWT = passportJWT.ExtractJwt;
const JWTStrategy   = passportJWT.Strategy;



const app = express();
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 2592000000, // 30 days in milliseconds
    }
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Configure Passport.js
passport.use(new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password',
    },
    async (email, password, done) => {
        try {
            const user = await User.findOne({ where: { email } });
            if (!user) {
                return done(null, false, { message: 'Invalid email' });
            }

            // Compare hashed password
            const passwordsMatch = await bcrypt.compare(password, user.password);
            if (!passwordsMatch) {
                return done(null, false, { message: 'Invalid email or password' });
            }
            console.log(email,password)
            return done(null, user);
        } catch (error) {
            return done(error);
        }
    }
));

var opts = {}
opts.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'your-secret-key';
passport.use(new JWTStrategy(opts, async function(jwt_payload, done) {
    try {
        console.log(jwt_payload)
        const user = await User.findByPk(jwt_payload.userId);
        done(null, user);
    } catch (error) {
        done(error, null);
    }
   

}));
// Serialize and deserialize user
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findByPk(id);
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});





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