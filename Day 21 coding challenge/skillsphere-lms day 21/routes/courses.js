const express = require('express');
const router = express.Router();
const { validateCourseId } = require('../middleware/validation');

// Sample courses data
const courses = [
  { 
    id: '101', 
    name: 'React Mastery', 
    duration: '6 weeks',
    instructor: 'John Doe',
    level: 'Intermediate'
  },
  { 
    id: '102', 
    name: 'Node.js Advanced', 
    duration: '8 weeks',
    instructor: 'Jane Smith',
    level: 'Advanced'
  },
  { 
    id: '103', 
    name: 'MongoDB Essentials', 
    duration: '4 weeks',
    instructor: 'Mike Johnson',
    level: 'Beginner'
  }
];

// Get all courses
router.get('/', (req, res) => {
  res.json({
    message: 'Courses retrieved successfully',
    count: courses.length,
    data: courses
  });
});

// Get course by ID with validation
router.get('/:id', validateCourseId, (req, res) => {
  const { id } = req.params;
  const course = courses.find(c => c.id === id);
  
  if (!course) {
    return res.status(404).json({
      error: 'Course not found'
    });
  }
  
  res.json({
    message: 'Course retrieved successfully',
    data: course
  });
});

module.exports = router;