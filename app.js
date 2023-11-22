const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')
const ProductRouter = require('./src/routes/product')
const userRouter = require('./src/routes/user')
const authRouter = require('./src/routes/auth')
const app = express()

// Limit the server to 5 requests per minute
const limiter = rateLimit({
  windowMs: 60000,
  max: 5,
  message: 'Too many requests, try again in one minute'
})

app.use(express.json())
app.use(helmet())
app.use(limiter)
app.use(cors({
  origin: '*'
}))

app.use('/products', new ProductRouter().getRouter())
app.use('/users', userRouter)
app.use('/auth', authRouter)

module.exports = app