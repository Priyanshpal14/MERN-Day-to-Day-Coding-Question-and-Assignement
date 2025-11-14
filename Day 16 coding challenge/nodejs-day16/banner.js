const chalk = require('chalk');
const figlet = require('figlet');

// Create stylized banner
figlet('Welcome to Node.js', (err, data) => {
    if (err) {
        console.log('Error creating banner');
        return;
    }
    
    // Display in colorful style
    console.log(chalk.cyan(data));
    console.log(chalk.green.bold('\n✓ Node.js is awesome!'));
    console.log(chalk.yellow('✓ npm makes dependency management easy'));
    console.log(chalk.magenta('✓ Build amazing applications!\n'));
});