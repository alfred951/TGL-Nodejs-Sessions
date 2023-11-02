// EXAMPLES OF USAGE OF ASYNC / AWAIT

const fsp = require('fs/promises');

// --------- Async / Await --------- Novice

async function readFileAsync(file) {
    try {
        const data = await fsp.readFile(file, 'utf8');
        console.log('Data read:', data);
    } catch (err) {
        console.error('Error reading file:', err);
    }
}

async function readFiles() {
    await readFileAsync('example1.txt');
    await readFileAsync('example2.txt');
    await readFileAsync('example3.txt');
    console.log("All files read!");
}
readFiles();


// --------- Async / Await v2 --------- Advanced

async function readFileAsync2(file) {
    try {
        const data = await fsp.readFile(file, 'utf8');
        console.log('Data read:', data);
    } catch (err) {
        console.error('Error reading file:', err);
    }
}

files = ['example1.txt', 'example2.txt', 'example3.txt']
async function readFiles2(files) {
    for (const file of files) {
        await readFileAsync2(file);
    }
    console.log("All files read!");
}

readFiles2(files);

