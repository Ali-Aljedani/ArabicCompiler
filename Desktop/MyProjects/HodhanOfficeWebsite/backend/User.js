const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 3
  },
  passwordHash: 
    {
      type: String,
	  required: true,
	  minlength: 6,
	  
    }
  ,
    phone: {
    type: String,
    required: true,
    unique: true,
    minlength: 10,
	maxLength: 10,
  },
  date: {
	  type: Date
  },
  userType: {
	  type: String
  },
})

schema.plugin(uniqueValidator)
module.exports = mongoose.model('User', schema)