// Challenge 3: Middleware to validate course ID
const validateCourseId = (req, res, next) => {
  const { id } = req.params;
  
  // Check if ID is numeric
  if (isNaN(id)) {
    return res.status(400).json({ 
      error: 'Invalid course ID' 
    });
  }
  
  // If valid, proceed to next middleware/route handler
  next();
};

module.exports = { validateCourseId };