require('dotenv').config()
require('./mongo')
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const app = express()
const typeAccountsRouter = require('./src/controllers/typeAccount')
const recipientsRouter = require('./src/controllers/recipient')
const usersRouter = require('./src/controllers/user')
const banksRouter = require('./src/controllers/bank')
const loginRouter = require('./src/controllers/login')
const transfersRouter = require('./src/controllers/transfer')
const notFound = require('./src/middleware/notFound')
const userExtractor = require('./src/middleware/userExtractor')
const handleErrors = require('./src/middleware/handleErrors')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))

app.get('/', (request, response) => {
  response.send('<center><h1>Aplicación backend para Prueba Técnica de Ripley</h1><p>Ignacio Díaz Fica<br>Ingeniero Civil Informático</p></center>')
})

// Rutas
app.use('/api/auth', loginRouter)
app.use('/api/users', usersRouter)
app.use('/api/banks', userExtractor, banksRouter)
app.use('/api/type-accounts', userExtractor, typeAccountsRouter)
app.use('/api/recipients', userExtractor, recipientsRouter)
app.use('/api/transfers', userExtractor, transfersRouter)
// Middlewares
app.use(notFound)
app.use(handleErrors)

// Conexión
const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
