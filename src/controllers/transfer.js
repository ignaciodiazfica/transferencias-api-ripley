const transfersRouter = require('express').Router()

const Transfer = require('../models/Transfer')

// GET ALL
transfersRouter.get('/', async (request, response) => {
  const { userId } = request
  const transfers = await Transfer.find({ user: userId })
    .populate('recipient', {
      rut: 1,
      name: 1,
      bank: 1,
      typeAccount: 1
    })
  response.json(transfers)
})
// GET ONE

// POST

// PUT

module.exports = transfersRouter
