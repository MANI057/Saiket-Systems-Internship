
import { useState } from 'react'
import './App.css'

function App() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const [posts, setPosts] = useState(() => {
    return JSON.parse(localStorage.getItem('posts')) || []
  })

  const addPost = () => {
    if (title === '' || content === '') {
      alert('Please enter title and content')
      return
    }

    const newPost = {
      id: Date.now(),
      title: title,
      content: content
    }

    const updatedPosts = [...posts, newPost]

    setPosts(updatedPosts)
    localStorage.setItem('posts', JSON.stringify(updatedPosts))

    setTitle('')
    setContent('')
  }

  const deletePost = (id) => {
    const updatedPosts = posts.filter(post => post.id !== id)

    setPosts(updatedPosts)
    localStorage.setItem('posts', JSON.stringify(updatedPosts))
  }

  return (
    <div className="container">
      <div className="blog">

        <h1>My Simple Blog</h1><br></br><br></br>

        <div className="form">
          <h2>Create New Post</h2>

          <input
            type="text"
            placeholder="Enter post title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            placeholder="Write your blog content..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <button onClick={addPost}>Add Post</button>
        </div>

        <div className="posts">
          <h2>My Blog Posts</h2>

          {posts.length === 0 ? (
            <p>No posts available. Create your first post!</p>
          ) : (
            posts.map((post) => (
              <div className="post" key={post.id}>
                <h3>{post.title}</h3>
                <p>{post.content}</p>
                <button
                  className="delete"
                  onClick={() => deletePost(post.id)}
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  )
}

export default App
