const transfersRouter = require('express').Router()

const Recipient = require('../models/Recipient')
const Transfer = require('../models/Transfer')
const User = require('../models/User')

// GET ALL
transfersRouter.get('/', async (request, response) => {
  const { userId } = request
  const transfers = await Transfer.find({ user: userId })
    .populate({
      path: 'recipient',
      select: {
        rut: 1,
        name: 1,
        bank: 1,
        typeAccount: 1
      },
      populate: {
        path: 'typeAccount',
        select: { name: 1 }
      }
    })
  response.json(transfers)
})
// GET ONE
transfersRouter.get('/:id', async (request, response) => {
  const { id } = request.params
  const transfer = await Transfer.findById(id)
    .populate({
      path: 'recipient',
      select: {
        rut: 1,
        name: 1,
        bank: 1,
        accountNumber: 1,
        typeAccount: 1
      },
      populate: {
        path: 'typeAccount',
        select: { name: 1 }
      }
    })
  if (!transfer) {
    return response.status(404).json({
      error: 'transfer not found'
    })
  }
  response.json(transfer)
})

// POST
transfersRouter.post('/', async (request, response, next) => {
  const { userId, body } = request
  const { recipientId, amount } = body

  try {
    const user = await User.findById(userId)
    const destinatario = await Recipient.findById(recipientId)

    const newTransfer = new Transfer({
      recipient: destinatario._id,
      amount,
      user: user._id,
      created: new Date()
    })
    const savedTransfer = await newTransfer.save()
    response.json(savedTransfer)
  } catch (error) {
    next(error)
  }
})

module.exports = transfersRouter
