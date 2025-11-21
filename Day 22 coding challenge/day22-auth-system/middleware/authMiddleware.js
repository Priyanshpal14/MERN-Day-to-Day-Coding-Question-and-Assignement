const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next(); // User is logged in, continue
  }
  res.status(401).send('Access Denied: Please log in first');
};

// Check if user is admin
const isAdmin = (req, res, next) => {
  if (req.isAuthenticated() && req.user.role === 'admin') {
    return next(); // User is admin, allow access
  }
  res.status(403).send('Access Denied: Admin privileges required');
};

module.exports = { isAuthenticated, isAdmin };