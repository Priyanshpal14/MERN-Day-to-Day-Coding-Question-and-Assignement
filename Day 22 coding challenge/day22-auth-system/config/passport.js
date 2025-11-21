const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');

module.exports = function(passport) {
  // Configure login strategy
  passport.use(new LocalStrategy(
    { usernameField: 'email' }, // Use email instead of username
    async (email, password, done) => {
      try {
        // Find user by email
        const user = await User.findOne({ email });
        
        if (!user) {
          return done(null, false, { message: 'Invalid email or password' });
        }
        
        // Check if password matches
        const isMatch = await user.comparePassword(password);
        
        if (!isMatch) {
          return done(null, false, { message: 'Invalid email or password' });
        }
        
        // Login successful
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  ));

  // Save user ID in session
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // Retrieve user from session
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });
};




