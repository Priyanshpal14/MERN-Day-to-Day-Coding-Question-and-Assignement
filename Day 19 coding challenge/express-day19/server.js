const express = require('express');
const app = express();
const PORT = 4000;

// Import routes
const bookRouter = require('./routes/books');

// Middleware
app.use(express.json());

// Logging middleware
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${req.method}] ${req.url} - ${timestamp}`);
  next();
});

// Basic routes
app.get('/', (req, res) => {
  res.send('Welcome to Express Server');
});

app.get('/status', (req, res) => {
  res.json({ server: "running", uptime: "OK" });
});

// Mount book routes
app.use('/books', bookRouter);

// 404 Error Handler (must be after all routes)
app.use((req, res, next) => {
  res.status(404).json({ error: 'Route not found' });
});

// Global Error Handler (must be last)
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});