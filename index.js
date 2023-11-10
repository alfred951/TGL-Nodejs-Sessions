const express = require('express')
const productRouter = require('./src/routes/product')
const app = express()
const port = 3000

app.use(express.json())

app.use('/products', productRouter)
// app.use('/users', productRouter)
// app.use('/catalog', productRouter)


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
});