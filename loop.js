// THIS IS AN EXAMPLE OF HOW THE NODE.JS EVENT LOOP 
// HAS AN EXECUTION ORDER FOR DIFFERENT ASYNC TASKS

console.log("1")

process.nextTick(() => { console.log("4") })

async function asyncFunction() {
    await new Promise((resolve) => {
        console.log("2");
        resolve();
    })
}

asyncFunction().then(() => {
    console.log("5")
})

setImmediate(() => {
    console.log("7")
})

setTimeout(() => {
    console.log("6")
}, 0)

console.log("3")