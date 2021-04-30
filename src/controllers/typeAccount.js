const typeAccountsRouter = require('express').Router()
const TypeAccount = require('../models/TypeAccount')

typeAccountsRouter.get('/', async (request, response) => {
  const typeAccounts = await TypeAccount.find({})
  response.json(typeAccounts)
})

typeAccountsRouter.post('/', async (request, response, next) => {
  const { name } = request.body
  if (!name) {
    return response.status(400).json({
      error: 'required "name" field is missing'
    })
  }
  const newTypeAccount = new TypeAccount({
    name: name,
    archived: false
  })
  try {
    const savedTypeAccount = await newTypeAccount.save()
    response.status(201).json(savedTypeAccount)
  } catch (error) {
    next(error)
  }
})

typeAccountsRouter.put('/:id', async (request, response, next) => {
  const { id } = request.params
  const { name, archived } = request.body

  const newTypeAccountInfo = {
    name,
    archived
  }
  try {
    const updatedTypeAccount = await TypeAccount.findByIdAndUpdate(id, newTypeAccountInfo, { new: true })
    response.status(200).json(updatedTypeAccount)
  } catch (error) {
    next(error)
  }
})

typeAccountsRouter.delete('/:id', async (request, response, next) => {
  const { id } = request.params
  try {
    await TypeAccount.findByIdAndDelete(id)
    response.status(204).end()
  } catch (error) {
    next(error)
  }
})
module.exports = typeAccountsRouter
