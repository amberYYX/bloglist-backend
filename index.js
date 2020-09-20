// const http = require('http') // -> Node's built-in web server module
const express = require('express')
const app = express() //simplyfy coding
app.use(express.json()) //for POST method

const mongoose = require('mongoose')
require('dotenv').config()
const url = process.env.MONGODB_URI

const Blog = require('./models/blog')

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MonDB', error.mongoose)
  })



//Hardcore data
// let blogs = [
//   {
//     id: 1,
//     title: 'good good study, day day up',
//     author: 'number one',
//     url: 'https://fullstackopen.com/en/part3/node_js_and_express',
//     likes: 4
//   },
//   {
//     id: 2,
//     title: 'eslint sometimes does not work',
//     author: 'lint',
//     url: 'https://eslint.org/',
//     likes: 2
//   },
//   {
//     id: 3,
//     title: 'upwards and onwards',
//     author: 'no ides',
//     url: 'https://www.google.com/',
//     likes: 5
//   }
// ]

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

app.use(requestLogger)

// app.get('/', (req, res) => {
//   res.send('<h1>hello</h11>')
// })

app.get('/api/blogs',(req, res) => {
  Blog.find({}).then(blogs => {
    res.json(blogs)
    console.log(blogs)
  })
})

app.get('/api/blogs/:id', (req, res) => {
  const id = Number(req.params.id)
  Blog.findOneAndRemove(id).then(blog => {
    res.json(blog)
  })
})

app.delete('/api/blogs/:id', (req, res, next) => {
  Blog.findOneAndRemove(req.params.id)
    .then(result => {
      res.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/blogs', (req, res) => {
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

const unkownEndpoint = (req, res) => {
  res.status(404).send( { error: 'unkown point' } )
}
app.use(unkownEndpoint)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
