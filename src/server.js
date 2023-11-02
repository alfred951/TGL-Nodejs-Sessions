const express = require('express')
const path = require('path')

const app = express()

// home page
app.get('/', (req, res) => {
    res.sendFile(path.resolve('./public/index.html'))
})

// about page
app.get('/about', (req, res) => {
    res.send('<h1>About page</h1>')
})

// 404
app.get('/*', (req, res) => {
    res.send('<h1>Page not found!</h1>')
})

const port = 3000
const hostname = '127.0.0.1'

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
}); 