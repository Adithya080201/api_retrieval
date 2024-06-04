import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPost } from "../services/api";
import "./CreatePost.css";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

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
      navigate("/");
    } catch (error) {
      console.error("Error creating post:", error);
      setError("Failed to create post. Please try again.");
    }
  };

  return (
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
        <button type="button" onClick={() => navigate("/")}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
