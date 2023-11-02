// EXAMPLE ON THE USAGE OF THE EVENTS LIBRARIES

const events = require('events')

// Create the emitter
let myEmitter = new events.EventEmitter();

// Create the handler
let myHandler = function () {
    console.log('An event arrived!')
}

// Configure the emitter to call the handler on 'alert' event
myEmitter.on('alert', myHandler)

// Emit the alert event once every second until program is interrupted
setInterval(() => {
    myEmitter.emit('alert')
}, 1000)