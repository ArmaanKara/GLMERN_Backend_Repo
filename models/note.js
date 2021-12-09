const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

console.log('connecting to MongoDB:', url)

mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    minLength: 1,
    required: true
  },
  date: {
    type:Date,
    required:true,
  },
  // _id: { type: mongoose.Schema.Types.ObjectId}
  // _id: String
})

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Note', noteSchema)