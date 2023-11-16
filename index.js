const express = require('express')
const productRouter = require('./src/routes/product')
const userRouter = require('./src/routes/user')
const authRouter = require('./src/routes/auth')
const app = express()
const port = 3000

app.use(express.json())

app.use('/products', productRouter)
app.use('/users', userRouter)
app.use('/auth', authRouter)

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
});