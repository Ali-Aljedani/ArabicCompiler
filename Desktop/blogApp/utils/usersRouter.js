const bcrypt = require('bcryptjs')
const usersRouter = require('express').Router()
const User = require('./user')

usersRouter.post('/', async (request, response) => {
  const body = request.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.json(savedUser)
})

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs',{title:1,author:1,likes:1,id:1})
  response.json(users)
})

module.exports = usersRouter