const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/User')

loginRouter.post('/', async (request, response) => {
  const { body } = request
  const { username, password } = body

  const user = await User.findOne({ username })
  const passwordCorrect = user === null ? false : await bcrypt.compare(password, user.passwordHash)
  if (!(user && passwordCorrect)) {
    response.status(401).json({
      error: 'invalid user or password'
    })
  } else {
    const objectToToken = {
      id: user._id,
      username: user.username
    }
    const token = jwt.sign(objectToToken, process.env.SECRET_KEY, {
      expiresIn: 60 * 60 * 24
    })
    response.json({
      name: user.name,
      username: user.username,
      token
    })
  }
})

module.exports = loginRouter
