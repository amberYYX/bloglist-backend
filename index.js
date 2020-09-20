// const http = require('http') // -> Node's built-in web server module
const express = require('express')
const app = express() //simplyfy coding
require('dotenv').config()
const url = process.env.MONGODB_URI

app.use(express.json()) //for POST method

//Hardcore data
let blogs = [
  {
    id: 1,
    title: 'good good study, day day up',
    author: 'number one',
    url: 'https://fullstackopen.com/en/part3/node_js_and_express',
    likes: 4
  },
  {
    id: 2,
    title: 'eslint sometimes does not work',
    author: 'lint',
    url: 'https://eslint.org/',
    likes: 2
  },
  {
    id: 3,
    title: 'upwards and onwards',
    author: 'no ides',
    url: 'https://www.google.com/',
    likes: 5
  }
]

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

app.use(requestLogger)

app.get('/', (req, res) => {
  res.send('<h1>hello</h11>')
})

app.get('/api/blogs',(req, res) => {
  res.json(blogs)
})

app.get('/api/blogs/:id', (req, res) => {
  const id = Number(req.params.id)
  const blog = blogs.find(blog => blog.id === id)
  if(blog){
    res.json(blog)
  } else {
    res.status(404).end()
  }
})

app.delete('/api/blogs/:id', (req, res) => {
  const id = Number(req.params.id)
  blogs = blogs.filter( blog => blog.id !== id)

  res.status(204).end()
})

app.post('/api/blogs', (req, res) => {
  const blog = req.body
  blogs = blogs.concat(blog)

  res.json(blog)
})

const unkownEndpoint = (req, res) => {
  res.status(404).send( { error: 'unkown point' } )
}
app.use(unkownEndpoint)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
