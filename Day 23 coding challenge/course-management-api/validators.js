const { body, validationResult } = require('express-validator');

// Validation rules for course creation and update
const courseValidationRules = () => {
  return [
    body('name')
      .notEmpty()
      .withMessage('Course name is required')
      .isLength({ min: 3 })
      .withMessage('Course name must be at least 3 characters long')
      .trim(),
    body('duration')
      .notEmpty()
      .withMessage('Duration is required')
      .matches(/^\d+\s+(week|weeks|month|months)$/i)
      .withMessage('Duration must be in format: "4 weeks" or "2 months"')
      .trim()
  ];
};

// Middleware to handle validation errors
const validate = (req, res, next) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      error: 'Validation failed',
      errors: errors.array().map(err => ({
        field: err.path,
        message: err.msg
      }))
    });
  }
  
  next();
};

module.exports = {
  courseValidationRules,
  validate
};