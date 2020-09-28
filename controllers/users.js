const userRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

userRouter.get('/', async(request, response) => {
  const users = await User.find({})

  /* this one returns users' info and their blogs content*/
  // const users = await User
  //   .find({}).populate('blogs')

  /* this one returns users' info and required blogs content*/
  // const users = await User
  //   .find({}).populate('notes', { content: 1, date: 1 })

  response.json(users)
})

userRouter.get('/:id', async(request, response) => {
  // const users = await User.find({})



  const users = await User
    .findById(request.params.id).populate('blogs')


  /* this one returns users' info and required blogs content*/
  // const users = await User
  //   .find({}).populate('notes', { content: 1, date: 1 })

  response.json(users)
})

userRouter.post('/', async(request,response) => {
  const body = request.body

  if(body.password.length < 3){
    // console.log('the password is at least 3 characters.')
    return response.status(400).json({ error: 'the password is at least 3 characters.' })
  }

  const duplicateUser = await User.findOne( { username: body.username }  )
  if (duplicateUser !== null){
    return response.status(400).json({ error: 'username exists.' })
  }

  console.log('---------------------')

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const newUser = new User({
    username: body.username,
    name: body.name,
    passwordHash: passwordHash,
    blogs: []
  })

  await newUser.save()
  response.status(200).end()
})

userRouter.delete('/:id', async(request, response) => {
  await User.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

module.exports = userRouter