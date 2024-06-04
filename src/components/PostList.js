import React, { useState, useEffect } from "react";
import { fetchPosts, createPost } from "../services/api";
import { Link } from "react-router-dom";
import "./PostList.css";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [start, setStart] = useState(0);
  const [limit] = useState(10);
  const [loading, setLoading] = useState(true);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    loadPosts();
  }, [start]);

  const loadPosts = async () => {
    setLoading(true);
    try {
      const response = await fetchPosts(start, limit);
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title.trim() === "") {
      setError("Title is required.");
      return;
    }
    if (body.length > 1000) {
      setError("Description should be less than 1000 characters.");
      return;
    }

    try {
      await createPost({ title, body });
      alert("Post created successfully!");
      setShowCreatePost(false);
      loadPosts();
    } catch (error) {
      console.error("Error creating post:", error);
      setError("Failed to create post. Please try again.");
    }
  };

  const nextPage = () => setStart(start + limit);
  const prevPage = () => setStart(start - limit);

  return (
    <div className="post-list-container">
      {showCreatePost ? (
        <div className="create-post-container">
          <h1>Create New Post</h1>
          {error && <p className="error">{error}</p>}
          <form onSubmit={handleSubmit} className="create-post-form">
            <div className="form-group">
              <label>Title:</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Description:</label>
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                maxLength="1000"
              />
            </div>
            <button type="submit">Submit</button>
            <button type="button" onClick={() => setShowCreatePost(false)}>
              Cancel
            </button>
          </form>
        </div>
      ) : (
        <div>
          <h1>Posts</h1>
          <button
            className="create-button"
            onClick={() => setShowCreatePost(true)}
          >
            Create New Post
          </button>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ul className="post-list">
              {posts.map((post) => (
                <li key={post.id} className="post-item">
                  <Link to={`/post/${post.id}`}>
                    <h2>{post.title}</h2>
                    <p>{post.body}</p>
                  </Link>
                </li>
              ))}
            </ul>
          )}
          <div className="pagination">
            <button onClick={prevPage} disabled={start === 0}>
              Previous
            </button>
            <button onClick={nextPage}>Next</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostList;
