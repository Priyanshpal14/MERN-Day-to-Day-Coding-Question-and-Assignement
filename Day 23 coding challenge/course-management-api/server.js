const express = require('express');
const rateLimit = require('express-rate-limit');
const { courseValidationRules, validate } = require('./validators');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// Rate limiting middleware
const apiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 5, // Limit each IP to 5 requests per windowMs
  message: {
    success: false,
    error: 'Too many requests, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Apply rate limiting to all API routes
app.use('/api/', apiLimiter);

// In-memory storage for courses
let courses = [
  { id: 1, name: 'JavaScript Fundamentals', duration: '4 weeks' },
  { id: 2, name: 'React Development', duration: '6 weeks' },
  { id: 3, name: 'Node.js Backend', duration: '8 weeks' }
];

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Course Management API',
    version: '1.0.0',
    endpoints: {
      courses: '/api/v1/courses'
    }
  });
});

// GET - Retrieve all courses
app.get('/api/v1/courses', (req, res) => {
  res.json({
    success: true,
    count: courses.length,
    data: courses
  });
});

// GET - Retrieve a single course by ID
app.get('/api/v1/courses/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  
  if (!course) {
    return res.status(404).json({
      success: false,
      error: 'Course not found'
    });
  }
  
  res.json({
    success: true,
    data: course
  });
});

// POST - Create a new course 
app.post('/api/v1/courses', 
  courseValidationRules(), 
  validate, 
  (req, res) => {
    const newCourse = {
      id: courses.length > 0 ? Math.max(...courses.map(c => c.id)) + 1 : 1,
      name: req.body.name,
      duration: req.body.duration
    };
    
    courses.push(newCourse);
    
    res.status(201).json({
      success: true,
      message: 'Course created successfully',
      data: newCourse
    });
  }
);

// PUT - Update an existing course 
app.put('/api/v1/courses/:id', 
  courseValidationRules(), 
  validate, 
  (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    
    if (!course) {
      return res.status(404).json({
        success: false,
        error: 'Course not found'
      });
    }
    
    course.name = req.body.name;
    course.duration = req.body.duration;
    
    res.json({
      success: true,
      message: 'Course updated successfully',
      data: course
    });
  }
);

// DELETE - Remove a course
app.delete('/api/v1/courses/:id', (req, res) => {
  const courseIndex = courses.findIndex(c => c.id === parseInt(req.params.id));
  
  if (courseIndex === -1) {
    return res.status(404).json({
      success: false,
      error: 'Course not found'
    });
  }
  
  const deletedCourse = courses.splice(courseIndex, 1);
  
  res.json({
    success: true,
    message: 'Course deleted successfully',
    data: deletedCourse[0]
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found'
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  
  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Internal Server Error'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
  console.log(` API endpoints available at http://localhost:${PORT}/api/v1/courses`);
  console.log(` Rate limit: 5 requests per minute`);
});