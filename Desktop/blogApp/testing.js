const favoriteBlog = (blogs => {
	if (blogs.length ===0)
		return null 
	let fav = blogs[0]
	blogs.forEach(blog => {
		if(blog.likes > fav.likes){
			fav = blog 
		}
	})
	
	return fav 
})

console.log(favoriteBlog([
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]))



/* console.log(

    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
    .likes
)
 */