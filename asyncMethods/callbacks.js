// EXAMPLES OF USAGE OF CALLBACKS

const fs = require('fs');

// --------- Callback v1 --------- Novice

// BAD CODE!!! Don't do this
function readFile(file) {
    fs.readFile(file, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
        }
        console.log('Data read:', data);
    });
}

readFile('example1.txt')
readFile('example2.txt')
readFile('example3.txt')
console.log('All files read!')


// --------- Callback v2 --------- Advanced


function readFileCallback(file, callback = null) {
    fs.readFile(file, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
        }

        console.log('Data read:', data);

        if (callback) {
            console.log('calling callback...');
            callback();
        }
    });
}

readFileCallback('example1.txt', () =>
    readFileCallback('example2.txt', () =>
        readFileCallback('example3.txt', () => { console.log('All files read!') }
        )
    )
)