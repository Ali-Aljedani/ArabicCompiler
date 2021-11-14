require('dotenv').config()
const { ApolloServer, gql,UserInputError,AuthenticationError } = require('apollo-server-express')
const express = require('express')
const {
  GraphQLUpload,
  graphqlUploadExpress, 
} = require('graphql-upload')
const { v1: uuid } = require('uuid')
const mongoose = require('mongoose')
const User = require('./User')
const Admin = require('./Admin')
const Land = require('./Land')
const Villa = require('./Villa')
const Building = require ('./Building')
const fs = require('fs')
const path = require('path')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const ITEMS_PER_PAGE = 12 
const JWT_SECRET = 'SECRET'

const MONGODB_URI = 'mongodb+srv://fullstack:fullstack@cluster0.xntns.mongodb.net/hodhanDatabase?retryWrites=true&w=majority'

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })



function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}

let code = makeid(10)


const typeDefs = gql `
	scalar Upload

	type User {
		username: String!
		passwordHash: String!
		id: ID!
		userType: String
		date: String 
		phone: String!
		noOfLands: Int! 
		noOfVillas: Int!
		noOfBuildings: Int!
	}
	type Admin {
		username: String!
	}
	type Villa {
		id:ID!
		size: Int!
		noOfRooms: Int!
		noOfHalls: Int
		noOfBathrooms: Int
		displayImage: String
		imagesOfVilla: [String!]
		imagesOfRooms: [String!]
		imagesOfKitchen: [String!]
		imagesOfBathrooms: [String!]
		imagesOfPlan: [String!]
		streetWidth: Int
		district: String!
		category: String! 
		landNo: Int
		purpose: String
		done: Boolean
		show: Boolean
		ownerName: String
		ownerPhone: String 
		date: String
		location: String
		userCreated: ID! 
		noOfStreets: Int
		streets: [String]
		landType: String!
		price: Int!
		age: Int!
		newOwnerName: String 
		newOwnerPhone: String
		notes: String
	}
	type Land {
		id:ID!
		size: Int!
		height: Int
		width: Int
		displayImage: String
		images: [String]
		streetWidth: Int
		district: String!
		category: String! 
		landNo: Int
		purpose: String
		done: Boolean
		show: Boolean
		ownerName: String
		ownerPhone: String 
		date: String
		location: String
		userCreated: ID  
		noOfStreets: Int
		streets: [String]
		landType: String!
		price: Int!
		newOwnerName: String 
		newOwnerPhone: String
		notes: String
	}
	type Building {
		id:ID!
		size: Int!
		noOfFlats: Int 
		displayImage: String
		imagesOfBuilding: [String!]
		imagesOfFlats: [String!]
		imagesOfPlan: [String!]
		streetWidth: Int
		district: String!
		category: String! 
		landNo: Int
		purpose: String
		done: Boolean
		show: Boolean
		ownerName: String
		ownerPhone: String 
		date: String
		location: String
		userCreated: ID!  
		noOfStreets: Int
		streets: [String]
		landType: String!
		price: Int!
		age: Int!
		newOwnerName: String 
		newOwnerPhone: String
		notes: String
	}
	
	type Token {
		value: String!
	}
	type Query {
		noOfLands: Int!
		noOfPagesLands(district: String category: String landType: String purpose:String): Int!
		noOfPagesMyLands(district: String category: String landType: String purpose:String): Int!
		noOfVillas: Int!
		noOfPagesVillas(district: String category: String landType: String purpose:String): Int!
		noOfPagesMyVillas(district: String category: String landType: String purpose:String): Int!
		noOfBuildings: Int!
		noOfPagesBuildings(district: String category: String landType: String purpose:String): Int!
		noOfPagesMyBuildings(district: String category: String landType: String purpose:String): Int!
		allLands(id:ID district: String category: String landNo: Int landType: String  ownerPhone: String purpose: String done: Boolean show:Boolean sortBy: String order: String page: Int done:String show:String ): [Land]!
		allVillas(id:ID district: String category: String landNo: Int landType: String  ownerPhone: String purpose: String done: Boolean show:Boolean sortBy: String order: String page: Int done:String show:String ): [Villa]!
		allBuildings(id:ID district: String category: String landNo: Int landType: String  ownerPhone: String purpose: String done: Boolean show:Boolean sortBy: String order: String page: Int done:String show:String ): [Building]!
		myLands(id:ID district: String category: String landNo: Int landType: String  ownerPhone: String purpose: String done: Boolean show:Boolean sortBy: String order: String page: Int done:String show:String ): [Land]!
		myVillas(id:ID district: String category: String landNo: Int landType: String  ownerPhone: String purpose: String done: Boolean show:Boolean sortBy: String order: String page: Int done:String show:String ): [Villa]!
		myBuildings(id:ID district: String category: String landNo: Int landType: String  ownerPhone: String purpose: String done: Boolean show:Boolean sortBy: String order: String page: Int done:String show:String ): [Building]!
		me: User 
		users: [User]
		getCode: String
	}
	type Mutation {
		createUser(
		username: String!
		phone: String!
		password: String!
		code: String!
		): User
		
		
		login(
		phone: String!
		password: String!
		):Token
		
		
		createAdmin(
		username: String!
		secret: String!): Admin
		
		
		addLand(
		size: Int!
		height: Int
		width: Int
		streetWidth: Int
		district: String!
		category: String! 
		landNo: Int
		purpose: String
		ownerName: String
		ownerPhone: String 
		location: String
		noOfStreets: Int
		streets: [String]
		landType: String!
		price: Int!
		notes: String
		): Land!
		
		
		editLand(
		id: ID!
		size: Int!
		height: Int
		width: Int
		streetWidth: Int
		district: String!
		category: String! 
		landNo: Int
		location: String
		noOfStreets: Int
		streets: [String]
		price: Int!
		landType: String!
		): Land!
		
		
		deleteLand(
		id: ID!
		): Boolean
		
		
		deleteVilla(
		id: ID!
		): Boolean
		
		
		deleteBuilding(
		id: ID!
		): Boolean
		
		
		addVilla(
		size: Int!
		noOfRooms: Int!
		noOfHalls: Int
		noOfBathrooms: Int
		streetWidth: Int
		district: String!
		category: String! 
		landNo: Int
		location: String
		noOfStreets: Int
		streets: [String]
		landType: String!
		purpose: String
		ownerName: String
		ownerPhone: String 
		price: Int!
		age: Int!
		notes: String
		): Villa!
		
		
		editVilla(
		id:ID!
		size: Int!
		villaSize: Int!
		noOfRooms: Int!
		noOfHalls: Int
		noOfBathrooms: Int
		imagesOfVilla: [String!]
		imagesOfRooms: [String!]
		imagesOfKitchen: [String!]
		imagesOfBathrooms: [String!]
		imagesOfPlan: [String!]
		district: String!
		category: String! 
		landNo: Int
		location: String
		userCreated: ID!  
		noOfStreets: Int
		streets: [String]
		price: Int!
		age: Int!
		): Villa!
		
		
		addBuilding(
		size: Int!
		noOfFlats: Int 
		streetWidth: Int
		district: String!
		category: String! 
		landNo: Int
		location: String
		noOfStreets: Int
		streets: [String]
		landType: String!
		purpose: String
		ownerName: String
		ownerPhone: String 
		price: Int!
		age: Int!
		notes: String
		): Building!
		
		
		editBuilding(
		id:ID!
		size: Int!
		buildingSize: Int
		noOfFlats: Int 
		imagesOfBuilding: [String!]
		imagesOfFlats: [String!]
		imagesOfPlan: [String!]
		district: String!
		category: String! 
		landNo: Int
		location: String
		userCreated: ID!  
		noOfStreets: Int
		streets: [String]
		price: Int!
		age: Int!
		): Building
		
		
		uploadImage(file: Upload! property: String id: ID place: String): Boolean
		
		setShow(property: String id: ID): Boolean
		
		setDone(property: String id: ID): Boolean
		
	}
`

const resolvers = {
	
	Upload: GraphQLUpload,
	
	
	Query: {
		noOfLands: () => Land.collection.countDocuments(),
		noOfPagesLands: async (root,args) => {
			const query = {}
			if(args.district){
				query.district = args.district
			}
			if(args.category){
				query.category = args.category
			}
			if(args.landType){
				query.landType= args.landType
			}
			if(args.purpose){
				query.purpose= args.purpose
			}
			const noOfDocuments = await Land.collection.countDocuments(query)
			return Math.ceil(noOfDocuments / ITEMS_PER_PAGE)
		},
		noOfPagesMyLands: async (root,args,context) => {
			const query = {}
			query.userCreated = context.currentUser._id
			if(args.district){
				query.district = args.district
			}
			if(args.category){
				query.category = args.category
			}
			if(args.landType){
				query.landType = args.landType
			}
			if(args.purpose){
				query.purpose= args.purpose
			}
			const noOfDocuments = await Land.collection.countDocuments(query)
			return Math.ceil(noOfDocuments / ITEMS_PER_PAGE)
		},
		noOfVillas: () => Villa.collection.countDocuments(),
		noOfPagesVillas: async (root,args) => {
			const query = {}
			if(args.district){
				query.district = args.district
			}
			if(args.category){
				query.category = args.category
			}
			if(args.landType){
				query.landType= args.landType
			}
			if(args.purpose){
				query.purpose= args.purpose
			}
			const noOfDocuments = await Villa.collection.countDocuments(query)
			return Math.ceil(noOfDocuments / ITEMS_PER_PAGE)
		},
		noOfPagesMyVillas: async (root,args,context) => {
			const query = {}
			query.userCreated = context.currentUser._id
			if(args.district){
				query.district = args.district
			}
			if(args.category){
				query.category = args.category
			}
			if(args.landType){
				query.landType = args.landType
			}
			if(args.purpose){
				query.purpose= args.purpose
			}
			const noOfDocuments = await Villa.collection.countDocuments(query)
			return Math.ceil(noOfDocuments / ITEMS_PER_PAGE)
		},
		noOfBuildings: () => Building.collection.countDocuments(),
		noOfPagesBuildings: async (root,args) => {
			const query = {}
			if(args.district){
				query.district = args.district
			}
			if(args.category){
				query.category = args.category
			}
			if(args.landType){
				query.landType= args.landType
			}
			if(args.purpose){
				query.purpose= args.purpose
			}
			const noOfDocuments = await Building.collection.countDocuments(query)
			return Math.ceil(noOfDocuments / ITEMS_PER_PAGE)
		},
		noOfPagesMyBuildings: async (root,args,context) => {
			const query = {}
			query.userCreated = context.currentUser._id
			if(args.district){
				query.district = args.district
			}
			if(args.category){
				query.category = args.category
			}
			if(args.landType){
				query.landType = args.landType
			}
			if(args.purpose){
				query.purpose= args.purpose
			}
			const noOfDocuments = await Building.collection.countDocuments(query)
			return Math.ceil(noOfDocuments / ITEMS_PER_PAGE)
		},
		allLands:  async (root,args) => {
			//await Land.deleteMany({})
			//await User.deleteMany({})
			const mySort = {}
			const query = {}
			if(args.sortBy){
				mySort[args.sortBy] = args.order === 'asc' ? 1 : -1
			}
			if(args.id){
				query._id = args.id
			}
			if(args.district){
				query.district = args.district
			}
			if(args.category){
				query.category = args.category
			}
			if(args.landNo){
				query.landNo = args.landNo
			}
			if(args.landType){
				query.landType= args.landType
			}
			if(args.purpose){
				query.purpose= args.purpose
			}
			if(args.done){
				query.done = args.done === "true"
			}
			if(args.show){
				query.show = args.show === "true"
			}
			console.log(query)
			if(args.sortBy){	
			return Land.find(query).sort(mySort).skip((args.page - 1) * ITEMS_PER_PAGE).limit(ITEMS_PER_PAGE)	
			}
			
			return Land.find(query).skip((args.page - 1) * ITEMS_PER_PAGE).limit(ITEMS_PER_PAGE)
		},
		allVillas: (root,args) => {
			const mySort = {}
			const query = {}
			if(args.sortBy){
				mySort[args.sortBy] = args.order === 'asc' ? 1 : -1
			}
			if(args.id){
				query._id = args.id
			}
			if(args.district){
				query.district = args.district
			}
			if(args.category){
				query.category = args.category
			}
			if(args.landNo){
				query.landNo = args.landNo
			}
			if(args.landType){
				query.landType= args.landType
			}
			if(args.purpose){
				query.purpose= args.purpose
			}
			if(args.done){
				query.done = args.done === "true"
			}
			if(args.show){
				query.show = args.show === "true"
			}
			console.log(query)
			if(args.sortBy){	
			return Villa.find(query).sort(mySort).skip((args.page - 1) * ITEMS_PER_PAGE).limit(ITEMS_PER_PAGE)	
			}
			
			return Villa.find(query).skip((args.page - 1) * ITEMS_PER_PAGE).limit(ITEMS_PER_PAGE)
		},
		allBuildings: (root,args) => {
			const mySort = {}
			const query = {}
			if(args.sortBy){
				mySort[args.sortBy] = args.order === 'asc' ? 1 : -1
			}
			if(args.id){
				query._id = args.id
			}
			if(args.district){
				query.district = args.district
			}
			if(args.category){
				query.category = args.category
			}
			if(args.landNo){
				query.landNo = args.landNo
			}
			if(args.landType){
				query.landType= args.landType
			}
			if(args.purpose){
				query.purpose= args.purpose
			}
			if(args.done){
				query.done = args.done === "true"
			}
			if(args.show){
				query.show = args.show === "true"
			}
			console.log(query)
			if(args.sortBy){	
			return Building.find(query).sort(mySort).skip((args.page - 1) * ITEMS_PER_PAGE).limit(ITEMS_PER_PAGE)	
			}
			
			return Building.find(query).skip((args.page - 1) * ITEMS_PER_PAGE).limit(ITEMS_PER_PAGE)
		},
		myLands:  (root,args,context) => {
			const mySort = {}
			const query = {}
			query.userCreated = context.currentUser._id
			if(args.sortBy){
				mySort[args.sortBy] = args.order === 'asc' ? 1 : -1
			}
			if(args.id){
				query._id = args.id
			}
			if(args.district){
				query.district = args.district
			}
			if(args.category){
				query.category = args.category
			}
			if(args.landNo){
				query.landNo = args.landNo
			}
			if(args.landType){
				query.landType= args.landType
			}
			if(args.purpose){
				query.purpose= args.purpose
			}
			if(args.done){
				query.done = args.done === "true"
			}
			if(args.show){
				query.show = args.show === "true"
			}
			console.log(query)
			if(args.sortBy){	
			return Land.find(query).sort(mySort).skip((args.page - 1) * ITEMS_PER_PAGE).limit(ITEMS_PER_PAGE)	
			}
			
			return Land.find(query).skip((args.page - 1) * ITEMS_PER_PAGE).limit(ITEMS_PER_PAGE)
		},
		myVillas: (root,args,context) => {
			const mySort = {}
			const query = {}
			query.userCreated = context.currentUser._id
			if(args.sortBy){
				mySort[args.sortBy] = args.order === 'asc' ? 1 : -1
			}
			if(args.id){
				query._id = args.id
			}
			if(args.district){
				query.district = args.district
			}
			if(args.category){
				query.category = args.category
			}
			if(args.landNo){
				query.landNo = args.landNo
			}
			if(args.landType){
				query.landType= args.landType
			}
			if(args.purpose){
				query.purpose= args.purpose
			}
			if(args.done){
				query.done = args.done === "true"
			}
			if(args.show){
				query.show = args.show === "true"
			}
			console.log(query)
			if(args.sortBy){	
			return Villa.find(query).sort(mySort).skip((args.page - 1) * ITEMS_PER_PAGE).limit(ITEMS_PER_PAGE)	
			}
			
			return Villa.find(query).skip((args.page - 1) * ITEMS_PER_PAGE).limit(ITEMS_PER_PAGE)
		},
		myBuildings: (root,args,context) => {
			const mySort = {}
			const query = {}
			query.userCreated = context.currentUser._id
			if(args.sortBy){
				mySort[args.sortBy] = args.order === 'asc' ? 1 : -1
			}
			if(args.id){
				query._id = args.id
			}
			if(args.district){
				query.district = args.district
			}
			if(args.category){
				query.category = args.category
			}
			if(args.landNo){
				query.landNo = args.landNo
			}
			if(args.landType){
				query.landType= args.landType
			}
			if(args.purpose){
				query.purpose= args.purpose
			}
			if(args.done){
				query.done = args.done === "true"
			}
			if(args.show){
				query.show = args.show === "true"
			}
			console.log(query)
			if(args.sortBy){	
			return Building.find(query).sort(mySort).skip((args.page - 1) * ITEMS_PER_PAGE).limit(ITEMS_PER_PAGE)	
			}
			
			return Building.find(query).skip((args.page - 1) * ITEMS_PER_PAGE).limit(ITEMS_PER_PAGE)
		},
		me: (root,args,context) => {
			console.log(context.currentUser)
			return context.currentUser
		},
		users: (root,args) => {
			return User.find({})
		},
		getCode: ()=>{
			return code
		}
	},
	User: {
		noOfLands: root => {
			return Land.countDocuments({userCreated:root.id})
		},
		noOfVillas: root => {
			return Villa.countDocuments({userCreated:root.id})
		},
		noOfBuildings: root => {
			return Building.countDocuments({userCreated:root.id})
		},
		date: root => {
			return root.date.toLocaleDateString('ar-SA')
		}
	}
	,
	Land: {
		displayImage: root => {
			if(!root.displayImage){
				return `http://localhost:4000/images/blackImage.jpg`
			}
			return `http://localhost:4000/images/${root.displayImage}`
		},
		images: root => {
			return root.images.map(image => `http://localhost:4000/images/${image}`)
		}
	},
	Villa: {
		displayImage: root => {
			if(!root.displayImage){
				return `http://localhost:4000/images/blackImage.jpg`
			}
			return `http://localhost:4000/images/${root.displayImage}`
		},
		imagesOfVilla: root => {
			return root.imagesOfVilla.map(image => `http://localhost:4000/images/${image}`)
		},
		imagesOfRooms: root => {
			return root.imagesOfRooms.map(image => `http://localhost:4000/images/${image}`)
		},
		imagesOfKitchen: root => {
			return root.imagesOfKitchen.map(image => `http://localhost:4000/images/${image}`)
		},
		imagesOfBathrooms: root => {
			return root.imagesOfBathrooms.map(image => `http://localhost:4000/images/${image}`)
		},
		imagesOfPlan: root => {
			return root.imagesOfPlan.map(image => `http://localhost:4000/images/${image}`)
		},
	},
	Building: {
		displayImage: root => {
			if(!root.displayImage){
				return `http://localhost:4000/images/blackImage.jpg`
			}
			return `http://localhost:4000/images/${root.displayImage}`
		},
		imagesOfBuilding: root => {
			return root.imagesOfBuilding.map(image => `http://localhost:4000/images/${image}`)
		},
		imagesOfFlats: root => {
			return root.imagesOfFlats.map(image => `http://localhost:4000/images/${image}`)
		},
		imagesOfPlan: root => {
			return root.imagesOfPlan.map(image => `http://localhost:4000/images/${image}`)
		},
	}
	
	,
	Mutation: {
		addLand: async (root,args,context) => {
			if(!context.currentUser){
				throw new AuthenticationError('غير مصرح لك')
			}
			const date = new Date()
			const done = false 
			const show = true 
			const land = new Land({
				...args,
				date,
				done,
				show,
				userCreated:context.currentUser._id
			})
			try {
			await land.save()
			} catch(error){
				throw new UserInputError(error.message, {
					  invalidArgs:args
				  })
			}
			
			return land
		},
		addVilla: async(root,args,context) => {
			if(!context.currentUser){
				throw new AuthenticationError('غير مصرح لك')
			}
			const date = new Date()
			const done = false 
			const show = true 
			const villa = new Villa({
				...args,
				date,
				done,
				show,
				userCreated:context.currentUser._id
			})
			try {
			await villa.save()
			} catch(error){
				throw new UserInputError(error.message, {
					  invalidArgs:args
				  })
			}
			
			return villa
		},
		addBuilding: async(root,args,context) => {
			if(!context.currentUser){
				throw new AuthenticationError('غير مصرح لك')
			}
			const date = new Date()
			const done = false 
			const show = true 
			const building = new Building({
				...args,
				date,
				done,
				show,
				userCreated:context.currentUser._id
			})
			try {
			await building.save()
			} catch(error){
				throw new UserInputError(error.message, {
					  invalidArgs:args
				  })
			}
			
			return building
		},
		editLand: async(root,args) => {
			const land = await Land.findOne({_id:args.id})
			Object.assign(land, args)
			try {
			land.save()
			} catch(error){
				throw new UserInputError(error.message, {
					  invalidArgs:args
				  })
			}
			return land 
			
			
		},
		editVilla: async (root,args) => {
			const villa = await Villa.findOne({_id:args.id})
			Object.assign(villa,args)
			try {
			villa.save()
			} catch(error){
				throw new UserInputError(error.message, {
					  invalidArgs:args
				  })
			}
			return villa 
		},
		editBuilding: async (root,args) => {
			const building = await Building.findOne({_id:args.id})
			Object.assign(building,args)
			try {
			building.save()
			} catch(error){
				throw new UserInputError(error.message, {
					  invalidArgs:args
				  })
			}
			return building
		},
		deleteLand: async (root,args) => {
		    const land = await Land.findOne({_id:args.id})
            const toDeleteDisplay = land.displayImage
			const toDeleteImages = land.images
			if(toDeleteDisplay){
				const pathName = path.join(__dirname,`public/images/${toDeleteDisplay}`)
				fs.unlink(pathName,()=>{console.log(pathName,' has been deleted')})
			}
			if(toDeleteImages[0]){
				for (image in toDeleteImages){
				const pathName = path.join(__dirname,`public/images/${image}`)
				fs.unlink(pathName,()=>{console.log(pathName,' has been deleted')})
				}
			}
			await Land.deleteOne({_id:args.id})
			return true 
		},
		deleteVilla: async (root,args) => {
		    const villa = await Villa.findOne({_id:args.id})
            const toDeleteDisplay = villa.displayImage
			const toDeleteImages = [...villa.imagesOfVilla,...villa.imagesOfRooms,...villa.imagesOfKitchen,...villa.imagesOfBathrooms,...villa.imagesOfPlan]
			if(toDeleteDisplay){
				const pathName = path.join(__dirname,`public/images/${toDeleteDisplay}`)
				fs.unlink(pathName,()=>{console.log(pathName,' has been deleted')})
			}
			if(toDeleteImages[0]){
				for (image in toDeleteImages){
				const pathName = path.join(__dirname,`public/images/${image}`)
				fs.unlink(pathName,()=>{console.log(pathName,' has been deleted')})
				}
			}
			await Villa.deleteOne({_id:args.id})
			return true 
		},
		deleteBuilding: async (root,args) => {
		    const building = await Building.findOne({_id:args.id})
            const toDeleteDisplay = building.displayImage
			const toDeleteImages = [...building.imagesOfBuilding,...building.imagesOfFlats,...building.imagesOfPlan]
			if(toDeleteDisplay){
				const pathName = path.join(__dirname,`public/images/${toDeleteDisplay}`)
				fs.unlink(pathName,()=>{console.log(pathName,' has been deleted')})
			}
			if(toDeleteImages[0]){
				for (image in toDeleteImages){
				const pathName = path.join(__dirname,`public/images/${image}`)
				fs.unlink(pathName,()=>{console.log(pathName,' has been deleted')})
				}
			}
			await Building.deleteOne({_id:args.id})
			return true 
		},
		uploadImage: async (root,args) => {
			
			const {createReadStream,filename} = await args.file
			const { ext } = path.parse(filename)
			const newName = makeid(15) + ext 
			const stream = createReadStream()
			const pathName = path.join(__dirname,`public/images/${newName}`)
			await stream.pipe(fs.createWriteStream(pathName))
			
		
			
			switch(args.property){
				case 'land': {
					const land = await Land.findOne({_id:args.id})
					switch(args.place){
						case 'display':{
						land.displayImage = newName
						break
						}
						case 'land':{
						land.images = land.images.concat(newName)
						break
						}
					}
					
					await land.save()
					return true
				}
				case 'villa': {
					const villa = await Villa.findOne({_id:args.id})
					switch(args.place){
						case 'display':{
						villa.displayImage = newName
						break
						}
						case 'villa':{
							villa.imagesOfVilla = villa.imagesOfVilla.concat(newName)
							break
						}
						case 'room':{
							villa.imagesOfRooms = villa.imagesOfRooms.concat(newName)
							break
						}
						case 'kitchen':{
							villa.imagesOfKitchen = villa.imagesOfKitchen.concat(newName)
							break
						}
						case 'bathroom':{
							villa.imagesOfBathrooms = villa.imagesOfBathrooms.concat(newName)
							break
						}
						case 'plan':{
							villa.imagesOfPlan = villa.imagesOfPlan.concat(newName)
							break
						}
					}
					await villa.save()
					return true 
				}
				case 'building':{
					const building = await  Building.findOne({_id:args.id})
					switch(args.place){
						case 'display':{
						building.displayImage = newName
						break
						}
						case 'building':{
							building.imagesOfBuilding = building.imagesOfBuilding.concat(newName)
							break
						}
						case 'flat':{
							building.imagesOfFlats = building.imagesOfFlats.concat(newName)
							break
						}
						case 'plan':{
							building.imagesOfPlan = building.imagesOfPlan.concat(newName)
							break
						}
					}
					await building.save()
				}
			}
			
			return false 
		},
		setShow: async (root,args) => {
			
			switch(args.property){
				case 'land': {
					const land = await Land.findOne({_id:args.id})
					land.show = !land.show
					await land.save()
					return true
				}
				case 'villa': {
					const villa = await Villa.findOne({_id:args.id})
					villa.show = !villa.show
					await villa.save()
					return true 
				}
				case 'building':{
					const building =await  Building.findOne({_id:args.id})
					building.show = !building.show
					await building.save()
					return true
				}
			}
			return false
		},
		setDone: async (root,args) => {
			
			switch(args.property){
				case 'land': {
					const land = await Land.findOne({_id:args.id})
					land.done = !land.done
					await land.save()
					return true
				}
				case 'villa': {
					const villa = await Villa.findOne({_id:args.id})
					villa.done = !villa.done
					await villa.save()
					return true 
				}
				case 'building':{
					const building =await  Building.findOne({_id:args.id})
					building.done = !building.done
					await building.save()
					return true
				}
			}
			return false
		}
		,
		createUser: async(root,args) => {
			isHere = await User.findOne({phone:args.phone})
			if(isHere){
				throw new UserInputError("تم التسجيل برقم الهاتف المدخل!", {
					  invalidArgs:args
				  })
			}
			let userType = 'user'
			console.log(process.env.ADMIN_CODE)
			const check = await bcrypt.compare(args.code, process.env.ADMIN_CODE)
			if(check){
				userType = 'admin'
			}
			else if(code !== args.code){
				throw new UserInputError("رمز تفعيل خاطئ!", {
					  invalidArgs:args
				  })
			}
			code = makeid(10)
			const date = new Date()
			const saltRounds = 10
			const passwordHash = await bcrypt.hash(args.password, saltRounds)
			const user = new User({
				username:args.username,
				phone:args.phone,
				passwordHash:passwordHash,
				userType:userType,
				date:date
			})
			try {
			await user.save()
			} catch(error){
				throw new UserInputError("خطأ في البيانات!", {
					  invalidArgs:args
				  })
			}
			return user
		},
		login: async (root, args) => {
		const user = await User.findOne({ phone: args.phone })
		const check = await bcrypt.compare(args.password, user.passwordHash)
		console.log(check)
		if ( !user || !check ) {
			throw new UserInputError("wrong credentials")
			return null
		}

		const userForToken = {
		username: user.username,
		phone: user.phone,
		id: user._id,
		}

		return { value: jwt.sign(userForToken, JWT_SECRET) }
  },
		
	}
	
}
async function startServer() {
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
})


  await server.start()

  const app = express()

  // This middleware should be added before calling `applyMiddleware`.
  app.use(graphqlUploadExpress())
  app.use(express.static('public'))
  server.applyMiddleware({ app })
  
 

  await new Promise(r => app.listen({ port: 4000 }, r))

  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
}

startServer()
