const banksRouter = require('express').Router()
const fetch = require('node-fetch')

banksRouter.get('/', async (request, response) => {
  const res = await fetch('https://bast.dev/api/banks.php')
  const banksJSON = await res.json()
  response.status(200).json(banksJSON.banks)
})

module.exports = banksRouter
