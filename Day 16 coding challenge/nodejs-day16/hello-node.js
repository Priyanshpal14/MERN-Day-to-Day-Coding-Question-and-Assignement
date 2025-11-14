// Display Node.js version
console.log('Node.js Version:', process.version);

// Display current file name and directory
console.log('Current File:', __filename);
console.log('Current Directory:', __dirname);

// Welcome message every 3 seconds
let counter = 0;
const intervalId = setInterval(() => {
    counter++;
    console.log(`Welcome to Node.js! (Message #${counter})`);
}, 3000);

// BONUS: Stop after 10 seconds
setTimeout(() => {
    clearInterval(intervalId);
    console.log('\nTimer stopped after 10 seconds.');
    console.log(`Total messages displayed: ${counter}`);
}, 10000);