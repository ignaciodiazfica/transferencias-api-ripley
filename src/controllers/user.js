const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/User')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({})
  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const { body } = request
  const { username, name, password } = body

  const passwordHash = await bcrypt.hash(password, 10)
  const user = new User({
    username,
    name,
    passwordHash
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

usersRouter.put('/:id', async (request, response) => {
  const { body, params } = request
  const { id } = params
  const { username, name, password } = body
  const passwordHash = await bcrypt.hash(password, 10)
  const newUserInfo = {
    username,
    name,
    passwordHash
  }
  const updatedUser = await User.findByIdAndUpdate(id, newUserInfo, { new: true })

  response.status(200).json(updatedUser)
})

usersRouter.delete('/:id', async (request, response, next) => {
  const { id } = request.params
  const res = await User.findByIdAndDelete(id)
  if (res === null) { return next() }
  response.status(204).end()
})
module.exports = usersRouter
