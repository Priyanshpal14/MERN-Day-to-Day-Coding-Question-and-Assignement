const express = require('express');
const app = express();
const PORT = 4000;

// Basic route
app.get('/', (req, res) => {
  res.send('Welcome to Express Server');
});

// Bonus: Status route
app.get('/status', (req, res) => {
  res.json({ 
    server: "running", 
    uptime: "OK" 
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
