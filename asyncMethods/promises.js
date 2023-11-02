// EXAMPLES OF USAGE OF PROMISES

const fsp = require('fs/promises');

// --------- Promise --------- Novice

// BAD CODE! Don't do!
function readFilePromise(file) {
    return fsp.readFile(file, 'utf8')
        .then((data) => {
            console.log('Data read:', data);
        })
        .catch((err) => {
            console.error('Error reading file:', err);
        });
}

readFilePromise('example1.txt')
    .then(() => readFilePromise('example2.txt')
        .then(() => readFilePromise('example3.txt')
            .then(() => console.log('All files read!')
            )
        )
    )


// --------- Promise v2 --------- Advanced


function readFilePromise(file) {
    return fsp.readFile(file, 'utf8');
}

Promise.all([
    readFilePromise("example1.txt"),
    readFilePromise("example2.txt"),
    readFilePromise("example3.txt")
]).then(([data1, data2, data3]) => {
    console.log('Data read:', data1);
    console.log('Data read:', data2);
    console.log('Data read:', data3);
    console.log("All files read!");
}).catch(error => {
    console.error(error.message);
});


// --------- Promise v3 --------- Expert


function readFilePromise3(file) {
    return fsp.readFile(file, 'utf8');
}

let files = ['example1.txt', 'example2.txt', 'example3.txt']

Promise.all(files.map(file => {
    return readFilePromise3(file);
})).then(readFiles => {
    readFiles.forEach(fileBuffer => {
        console.log('Data read:', fileBuffer.toString());
    });
    console.log("All files read!")
}).catch(error => {
    console.error(error.message);
});
