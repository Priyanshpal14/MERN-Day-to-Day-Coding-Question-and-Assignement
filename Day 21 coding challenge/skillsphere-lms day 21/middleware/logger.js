// 1: Logging Middleware
const requestLogger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  const method = req.method;
  const url = req.url;
  
  console.log(`[${method}] ${url} at ${timestamp}`);
  
  next();
};

module.exports = { requestLogger };