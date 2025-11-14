
const moment = require('moment');

// Get name from command line arguments
// process.argv[0] = node path
// process.argv[1] = script path
// process.argv[2] = first argument (name)
const name = process.argv[2];

// Check if name is provided
if (!name) {
    console.log('Please provide your name!');
    console.log('Usage: node greet.js [YourName]');
    process.exit(1);
}

// Get formatted date and time
const dateTime = moment().format('ddd MMM D YYYY, h:mm A');

// Display greeting
console.log(`Hello, ${name}! Today is ${dateTime}`);