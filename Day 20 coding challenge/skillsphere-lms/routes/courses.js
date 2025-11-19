const express = require('express');
const router = express.Router();
const { validateCourseId } = require('../middleware/validation');

// Challenge 2: Dynamic route with course ID
// Challenge 3: Apply validation middleware
router.get('/:id', validateCourseId, (req, res) => {
  const { id } = req.params;
  
  // Return course details
  res.json({
    id: id,
    name: 'React Mastery',
    duration: '6 weeks'
  });
});

module.exports = router;