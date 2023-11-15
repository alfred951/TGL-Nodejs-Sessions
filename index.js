const express = require('express')
const productRouter = require('./src/routes/product')
const errorHandler = require('./src/middlewares/errorHandler')
const requestLogger = require('./src/middlewares/requestLogger')
const app = express()
const port = 3000

// Express built in middlewares
app.use(express.json());
app.use(express.static('public'));

// Application custom middleware
app.use(requestLogger);

// Route middlewares inside!
app.use('/products', productRouter);

// Error handling middleware
app.use(errorHandler)

// NOTE: the error handling middleware must be declared after the router
// Otherwise the default express error handler is used

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
});