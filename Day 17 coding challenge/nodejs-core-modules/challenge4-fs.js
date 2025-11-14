const fs = require('fs').promises;

async function handleFile() {
  const userInput = "Node.js is awesome!";
  const filename = 'feedback.txt';

  try {
    // Write to file
    await fs.writeFile(filename, userInput);
    console.log('Data written successfully.');

    // Read from file
    console.log('Reading file...');
    const data = await fs.readFile(filename, 'utf8');
    console.log(data);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

handleFile();