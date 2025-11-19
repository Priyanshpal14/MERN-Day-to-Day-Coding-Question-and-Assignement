const express = require('express');
const coursesRouter = require('./routes/courses');

const app = express();
const PORT = 4000;

// Middleware to parse JSON
app.use(express.json());

// Challenge 1: Root route with welcome message
app.get('/', (req, res) => {
  res.send('Welcome to SkillSphere LMS API');
});

// Use courses router
app.use('/courses', coursesRouter);

// Start server
app.listen(PORT, () => {
  console.log(`SkillSphere LMS API is running on http://localhost:${PORT}`);
});