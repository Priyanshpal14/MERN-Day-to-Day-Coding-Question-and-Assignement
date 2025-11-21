// Load environment variables from .env file
require('dotenv').config();

// Import required packages
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');


// Initialize Express app
const app = express();

// Configure Passport
require('./config/passport')(passport);

// Import routes
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');

// MIDDLEWARE SETUP

// Parse form data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Set EJS as view engine
app.set('view engine', 'ejs');

// Configure sessions
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 // 24 hours
  }
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// DATABASE CONNECTION 

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log(' MongoDB connected successfully');
    console.log(' Database:', process.env.MONGODB_URI);
  })
  .catch(err => {
    console.error(' MongoDB connection error:', err);
  });

//  ROUTES 

// Home route - redirect to register page
app.get('/', (req, res) => {
  res.redirect('/register');
});

// Authentication routes (register, login, logout)
app.use('/', authRoutes);

// Protected routes (welcome, admin)
app.use('/', adminRoutes);


// START SERVER 

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(' Server started successfully!');
  console.log(` Server running at: http://localhost:${PORT}`);
  console.log(' Register: http://localhost:${PORT}/register');
  console.log(' Login: http://localhost:${PORT}/login');
});