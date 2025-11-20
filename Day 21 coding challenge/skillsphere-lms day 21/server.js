const express = require('express');
const path = require('path');
const coursesRouter = require('./routes/courses');
const usersRouter = require('./routes/users');
const { requestLogger } = require('./middleware/logger');

const app = express();
const PORT = 4000;

// Set up EJS as view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Apply logging middleware globally
app.use(requestLogger);

// Built-in middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to SkillSphere LMS API');
});

// API routes
app.use('/courses', coursesRouter);
app.use('/users', usersRouter);

// Route to render courses page
app.get('/view/courses', (req, res) => {
  const courses = [
    { id: '101', name: 'React Mastery', duration: '6 weeks' },
    { id: '102', name: 'Node.js Advanced', duration: '8 weeks' },
    { id: '103', name: 'MongoDB Essentials', duration: '4 weeks' }
  ];
  
  res.render('courses', { courses: courses });
});

// Start server
app.listen(PORT, () => {
  console.log(`SkillSphere LMS API is running on http://localhost:${PORT}`);
  console.log(`View courses at http://localhost:${PORT}/view/courses`);
});