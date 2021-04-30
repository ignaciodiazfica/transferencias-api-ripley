const recipientsRouter = require('express').Router()

const Recipient = require('../models/Recipient')
const User = require('../models/User')
const TypeAccount = require('../models/TypeAccount')

// GET ALL RECIPIENTS BY USER AUTENTICATED
recipientsRouter.get('/', async (request, response) => {
  const { userId } = request
  const recipients = await Recipient.find({ user: userId })
    .populate('user', {
      username: 1
    })
    .populate('typeAccount', {
      name: 1
    })
  response.json(recipients)
})
// GET ONE
recipientsRouter.get('/:id', async (request, response) => {
  const { id } = request.params

  const recipient = await Recipient.findById(id)
    .populate({
      path: 'typeAccount',
      select: { name: 1 }
    })
  if (!recipient) {
    return response.status(404).json({
      error: 'recipient not found'
    })
  }
  response.json(recipient)
})
// POST: CREATE A NEW RECIPIENT
recipientsRouter.post('/', async (request, response, next) => {
  const { userId, body } = request
  const { rut, name, email, bank, phone, typeAccount, accountNumber } = body
  try {
    const user = await User.findById(userId)
    const tipoCuenta = await TypeAccount.findById(typeAccount)
    if (!rut) {
      return response.status(400).json({
        error: 'required "rut" field is missing'
      })
    }
    const newRecipient = new Recipient({
      rut,
      name,
      email,
      phone,
      bank,
      typeAccount: tipoCuenta._id,
      user: user._id,
      accountNumber,
      created: new Date()
    })
    const savedRecipient = await newRecipient.save()
    response.json(savedRecipient)
  } catch (error) {
    next(error)
  }
})
// PUT: UPDATE A RECIPIENT BY ID
recipientsRouter.put('/:id', async (request, response, next) => {
  const { id } = request.params
  const { rut, name, email, bank, phone, typeAccount, accountNumber } = request.body

  try {
    const tipoCuenta = await TypeAccount.findById(typeAccount)
    const newRecipientInfo = {
      rut,
      name,
      email,
      bank,
      phone,
      typeAccount: tipoCuenta._id,
      accountNumber,
      updated: new Date()
    }
    const updatedRecipient = await Recipient.findByIdAndUpdate(id, newRecipientInfo, { new: true })
    response.status(200).json(updatedRecipient)
  } catch (error) {
    next(error)
  }
})

recipientsRouter.delete('/:id', async (request, response, next) => {
  const { id } = request.params
  try {
    await Recipient.findByIdAndDelete(id)
    response.status(204).end()
  } catch (error) {
    next(error)
  }
})
module.exports = recipientsRouter
