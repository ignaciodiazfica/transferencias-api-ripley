const { Schema, model } = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const TransferSchema = new Schema({
  recipient: [{
    type: Schema.Types.ObjectId,
    ref: 'Recipient'
  }],
  amount: Number,
  user: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  created: Date
})
TransferSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})
TransferSchema.plugin(uniqueValidator)
const Transfer = model('Transfer', TransferSchema)
module.exports = Transfer
