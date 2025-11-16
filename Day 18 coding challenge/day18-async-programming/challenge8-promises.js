// Challenge 8: Promises
const fs = require('fs').promises;

console.log('Starting file copy operation with Promises...');

// Read from input.txt and write to output.txt using Promises
fs.readFile('input.txt', 'utf8')
    .then(data => {
        console.log('File read successfully!');
        console.log('Content:', data);
        
        // Write to output.txt
        return fs.writeFile('output.txt', data, 'utf8');
    })
    .then(() => {
        console.log('File copied successfully!');
    })
    .catch(err => {
        console.error('Error occurred:', err.message);
    })
    .finally(() => {
        console.log('Operation completed.');
    });

console.log('Promise chain initiated (non-blocking)');