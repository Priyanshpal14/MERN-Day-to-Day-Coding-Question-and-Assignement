// Challenge 7: Callbacks
const fs = require('fs');

console.log('Starting file read operation...');

// Read file using callback
fs.readFile('data.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }
    
    console.log('File Content:', data);
    
    // Bonus: Add intentional delay using setTimeout
    setTimeout(() => {
        console.log('Read operation completed');
    }, 2000); // 2 second delay
});

console.log('File read initiated (non-blocking)');