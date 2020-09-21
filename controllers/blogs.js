const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/',(req, res) => {
  Blog.find({}).then(blogs => {
    res.json(blogs)
    console.log(blogs)
  })
})

blogRouter.get('/:id', (req, res) => {
  const id = Number(req.params.id)
  Blog.findOneAndRemove(id).then(blog => {
    res.json(blog)
  })
})

blogRouter.delete('/:id', (req, res, next) => {
  Blog.findOneAndRemove(req.params.id)
    .then(result => {
      res.status(204).end()
    })
    .catch(error => next(error))
})

blogRouter.post('/', (req, res) => {
  const body = req.body

  const newBlog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  })

  newBlog.save().then(savedBlog => {
    res.json(savedBlog)
  })
})

module.exports = blogRouter