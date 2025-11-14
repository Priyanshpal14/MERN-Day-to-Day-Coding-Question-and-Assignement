const EventEmitter = require('events');

// Create an instance of EventEmitter
const eventEmitter = new EventEmitter();

// Register event listeners
eventEmitter.on('userLoggedIn', (username) => {
  console.log(`User ${username} logged in.`);
});

eventEmitter.on('userLoggedOut', (username) => {
  console.log(`User ${username} logged out.`);
});

eventEmitter.on('sessionExpired', (username) => {
  console.log(`Session expired for user ${username}.`);
});

// Emit events
eventEmitter.emit('userLoggedIn', 'Priyansh');
eventEmitter.emit('userLoggedOut', 'Priyansh');

// Bonus: Emit sessionExpired after 5 seconds
setTimeout(() => {
  eventEmitter.emit('sessionExpired', 'Priyansh');
}, 5000);

console.log('Waiting for session to expire...');