const { Schema, model } = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const RecipientSchema = new Schema({
  rut: {
    type: String,
    unique: true
  },
  name: String,
  email: String,
  phone: String,
  bank: String,
  typeAccount: [{
    type: Schema.Types.ObjectId,
    ref: 'TypeAccount'
  }],
  user: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  accountNumber: String,
  created: Date,
  updated: Date
})

RecipientSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

RecipientSchema.plugin(uniqueValidator)
const Recipient = model('Recipient', RecipientSchema)
module.exports = Recipient
