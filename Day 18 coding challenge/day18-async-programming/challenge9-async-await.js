// Challenge 9: Async/Await
const fs = require('fs').promises;

// Main async function
async function copyFile() {
    try {
        console.log('Starting file copy operation with async/await...');
        
        // Read content from input.txt
        const data = await fs.readFile('input.txt', 'utf8');
        console.log('File read successfully!');
        console.log('Content:', data);
        
        console.log('Simulating slow operation...');
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log('Delay completed!');
        
        // Write to output.txt
        await fs.writeFile('output.txt', data, 'utf8');
        console.log('File copied successfully!');
        
    } catch (err) {
        console.error('Error occurred:', err.message);
    } finally {
        console.log('Operation completed.');
    }
}

// Execute the async function
copyFile();

console.log('Async function called (non-blocking)');