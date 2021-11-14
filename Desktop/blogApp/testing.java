const totalLikes = (blogs) => {
	blogs.reduce((sum,blog) =>{
		console.log(blog.likes)
		return sum + blog.likes
	})
}

console.log(totalLikes(
[
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]
))