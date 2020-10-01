const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogRouter.get('/',async(req, res) => {
  const blogs = await Blog.find({}).populate('user')
  res.json(blogs)
})
//---------------------------------------------------

blogRouter.get('/:id', async(req, res) => {
  const aimBlog = await Blog.findById(req.params.id)
  res.json(aimBlog)
})

//blog attached to user
//---------------------------------------------------
const getTokenFrom = request => {
  const authorization = request.get('authorization')

  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}
//---------------------------------------------------


blogRouter.post('/', async(req, res) => {
  const body = req.body

  // const user = await User.findOne(body.userId)

  const token = getTokenFrom(req)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  // const decodedToken = jwt.verify(req.token, process.env.SECRET)

  if (!token || !decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)


  const newBlog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })

  const savedNewBlog = await newBlog.save()

  user.blogs = user.blogs.concat(savedNewBlog._id)
  await user.save()

  res.json(savedNewBlog)
})

//---------------------------------------------------
blogRouter.delete('/:id', async(req, res) => {

  const token = getTokenFrom(req)
  const decodedToken = jwt.verify(token, process.env.SECRET)

  if (!token || !decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }

  const blog = await Blog.findById(req.params.id)
  const user = await User.findById(decodedToken.id)

  console.log(`user id in blog. -- ${blog.user}`)
  console.log(`user id in user. -- ${user._id}`)

  if ( blog.user.toString() === user._id.toString() ){
    console.log('identification check')

    user.blogs = user.blogs.filter(b => b.toString() !== req.params.id)
    await user.save()

    await Blog.findOneAndRemove(req.params.id)
    res.status(204).end()
  }
})

//---------------------------------------------------
blogRouter.put('/:id', async(req, res) => {
  const body = req.body
  console.log(body)
  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, body )
  console.log(updatedBlog)

  res.json(updatedBlog)
})



module.exports = blogRouter