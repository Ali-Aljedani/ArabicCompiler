const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const schema = new mongoose.Schema({
  size: {
	  type: Number, 
	  required: true,
  },
  height: {
	  type: Number
  },
  width: {
	  type: Number
  },
  streetWidth: {
	  type: Number
  },
  district: {
	  type: String,
	  required: true,
  },
  category: {
	  type: String
  },
  landNo: {
	  type: Number,
  },
  purpose: {
	  type: String
  },
  done: {
	  type: Boolean
  },
  show: {
	  type: Boolean
  },
  location: {
	  type: String
  },
  displayImage: {
	  type:String
  },
  images: {
	  type:[String]
  },
  userCreated: {
	  type:mongoose.Schema.Types.ObjectId,
	  ref: 'User'
  },
  noOfStreets:{
	  type: Number
  },
  streets: {
	  type: [String]
  },
  landType: {
	  type: String,
	  required: true,
  },
  price:{
	  type: Number,
	  required: true,
	},
  ownerName: {
	  type: String
  },
  ownerPhone: {
	  type: String
  },
  newOwnerName: {
	  type: String
  },
  newOwnerPhone: {
	  type: String
  },
  date: {
	  type: Date
  },
  notes: {
	  type: String
  },
})

schema.plugin(uniqueValidator)
module.exports = mongoose.model('Land', schema)