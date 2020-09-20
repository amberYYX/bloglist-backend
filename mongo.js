const mongoose = require('mongoose')

require('dotenv').config()
const url = process.env.MONGODB_URI

console.log('connecting to ', url)

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MonDB', error.mongoose)
  })

const blogSchema = new mongoose.Schema(
  {
    title: String,
    author: String,
    url: String,
    likes: Number
  }
)

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Blog = mongoose.model('Blog', blogSchema)

// module.exports = mongoose.model('Item', ItemSchema)

//for test
// const blog = new Blog({
//   id: 456,
//   title: 'Str---ing',
//   author: 'Stvhgfnring',
//   url: 'Sdgagatring',
//   likes: 55

// })

// blog.save().then(result => {
//   console.log('note saved!')
//   mongoose.connection.close()
// })

// // 返回所有。 {}里面可以添加搜索条件
// Blog.find({}).then(result => {
//   result.forEach(note => {
//     console.log(note)
//   })
//   mongoose.connection.close()
// })

