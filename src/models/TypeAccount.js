const { Schema, model } = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const typeAccountSchema = new Schema({
  name: {
    type: String,
    unique: true
  },
  archived: Boolean
})
typeAccountSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})
typeAccountSchema.plugin(uniqueValidator)
const TypeAccount = model('TypeAccount', typeAccountSchema)
module.exports = TypeAccount
