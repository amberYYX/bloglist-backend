// const dummy = (blogs) => {
//   return 1
// }

// module.exports = {
//   dummy
// }

const totalLikes = (blogs) => {
  // const start = 0
  //↓returns an array of likes, e.g.[2,5,0,10]
  // const countTotoalLikes = blogs.map(blog => blog.likes + start)
  const countTotoalLikes = blogs.reduce((accmulator, blog) => accmulator + blog.likes, 0)

  return countTotoalLikes
}

const favoriteBlog = (blogs) => {
  //no idea why []!==[]
  // if(blogs === null) {
  //   return null
  // }

  //---------------------------------------------
  const max = blogs.reduce((maxLikes, blog) => maxLikes > blog.likes ? maxLikes:blog, null)

  if (max === null) {
    return []
  }else {
    return [{
      title: max.title,
      author: max.author,
      likes: max.likes
    }]
  }

  // let maxLikesBlog = []
  // if (blogs === maxLikesBlog) {
  //   return []
  // }

  // blogs.forEach(blog => {
  //   if (blog.likes > maxLikesBlog){
  //     maxLikesBlog = blog
  //   }
  // })

  // return [{
  //   title: maxLikesBlog.title,
  //   author: maxLikesBlog.author,
  //   likes: maxLikesBlog.likes
  // }]

}


module.exports = {
  totalLikes,
  favoriteBlog
}