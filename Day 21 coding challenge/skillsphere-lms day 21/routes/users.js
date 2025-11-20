const express = require('express');
const router = express.Router();

// Sample users storage (in-memory for demo)
let users = [];
let userId = 1;

// GET all users
router.get('/', (req, res) => {
  res.json({
    message: 'Users retrieved successfully',
    count: users.length,
    data: users
  });
});

// 2 POST endpoint to create user
router.post('/', (req, res) => {
  const { name, email, role } = req.body;
  
  // Basic validation
  if (!name || !email) {
    return res.status(400).json({
      error: 'Name and email are required'
    });
  }
  
  // Create new user
  const newUser = {
    id: userId++,
    name,
    email,
    role: role || 'student',
    createdAt: new Date().toISOString()
  };
  
  users.push(newUser);
  
  res.status(201).json({
    message: 'User created successfully',
    data: newUser
  });
});

// GET single user by ID
router.get('/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  
  if (!user) {
    return res.status(404).json({
      error: 'User not found'
    });
  }
  
  res.json({
    message: 'User retrieved successfully',
    data: user
  });
});

module.exports = router;