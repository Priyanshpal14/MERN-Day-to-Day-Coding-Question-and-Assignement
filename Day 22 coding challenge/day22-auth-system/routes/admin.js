const express = require('express');
const router = express.Router();
const { isAuthenticated, isAdmin } = require('../middleware/authMiddleware');

// CHALLENGE 3: Admin-only route with RBAC
router.get('/admin', isAuthenticated, isAdmin, (req, res) => {
  res.render('admin', { user: req.user });
});

// Welcome page for logged-in users
router.get('/welcome', isAuthenticated, (req, res) => {
  res.render('welcome', { user: req.user });
});

module.exports = router;