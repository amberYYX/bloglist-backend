const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogRouter.get('/',async(req, res) => {
  const blogs = await Blog.find({})
  res.json(blogs)
})

blogRouter.get('/:id', async(req, res) => {
  const aimBlog = await Blog.findById(req.params.id)
  res.json(aimBlog)
})

blogRouter.delete('/:id', async(req, res) => {
  await Blog.findOneAndRemove(req.params.id)
  res.status(204).end()
})

blogRouter.post('/', async(req, res) => {
  const body = req.body

  const user = await User.findOne(body.userId)

  const newBlog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })

  user.blogs = user.blogs.concat(newBlog._id)
  await user.save()
  res.json(newBlog)
})

module.exports = blogRouter