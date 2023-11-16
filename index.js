const session = require('express-session')
const express = require('express')
const sequelizeStore = require('connect-session-sequelize')(session.Store)
const productRouter = require('./src/routes/product')
const userRouter = require('./src/routes/user')
const authRouter = require('./src/routes/auth')
const sequelize = require('./src/db/sequelize')
const app = express()
const port = 3000

app.use(express.json())
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  store: new sequelizeStore({
    db: sequelize
  }),
  cookie: { maxAge: 3000000000 }
}))

sequelize.sync().then(() => {
  console.log('Database synchronized.');
});

app.use('/products', productRouter)
app.use('/users', userRouter)
app.use('/auth', authRouter)

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
});