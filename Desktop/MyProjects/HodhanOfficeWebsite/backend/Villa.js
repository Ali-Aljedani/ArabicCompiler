const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const schema = new mongoose.Schema({
    size:{
		type: Number,
		required: true
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
	noOfRooms: {
		type: Number,
		required: true,
	},
	noOfHalls:{
		type: Number
	},
	noOfBathrooms:{
		type: Number,
	},
	displayImage: {
	  type:String
    },
	imagesOfVilla:{
		type: [String]
	},
	imagesOfRooms:{
		type: [String]
	},
	imagesOfKitchen:{
		type: [String]
	},
	imagesOfBathrooms:{
		type: [String]
	},
	imagesOfPlan:{
		type: [String]
	},
	district: {
		type: String,
		required: true,
    },
    category: {
		type: String,
		required: true,
    },
    landNo: {
		type: Number,
    },
    location: {
		type: String,
		
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
	age:{
		type: Number,
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
	streetWidth: {
	  type: Number
  },
})

schema.plugin(uniqueValidator)
module.exports = mongoose.model('Villa', schema)