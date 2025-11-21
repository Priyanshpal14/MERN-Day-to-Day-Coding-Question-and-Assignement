const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/User');

// Show registration page
router.get('/register', (req, res) => {
  res.render('register');
});

// CHALLENGE 1: Handle registration form submission
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    
    // Validate that all fields are filled
    if (!name || !email || !password) {
      return res.status(400).send('All fields are required');
    }
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send('User already exists with this email');
    }
    
    // CHALLENGE 2: Create and save user to MongoDB
    const newUser = new User({
      name,
      email,
      password, // Will be automatically hashed by User model
      role: role || 'user'
    });
    
    await newUser.save();
    console.log('✅ User saved to database:', newUser.name);
    
    // CHALLENGE 1: Expected Output
    res.send(`Registration successful for ${name}`);
  } catch (error) {
    console.error(' Registration error:', error);
    res.status(500).send('Server error during registration');
  }
});

// Show login page
router.get('/login', (req, res) => {
  res.render('login');
});

// CHALLENGE 3: Handle login with Passport.js
router.post('/login', passport.authenticate('local', {
  successRedirect: '/welcome',
  failureRedirect: '/login'
}));

// Handle logout
router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect('/login');
  });
});

module.exports = router;