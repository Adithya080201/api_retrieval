import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchPostById } from "../services/api";
import "./PostDetail.css";

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPost = async () => {
      setLoading(true);
      try {
        const response = await fetchPostById(id);
        setPost(response.data);
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setLoading(false);
      }
    };
    loadPost();
  }, [id]);

  return (
    <div className="post-detail-container">
      {loading ? (
        <p>Loading...</p>
      ) : post ? (
        <div className="post-detail">
          <h1>{post.title}</h1>
          <p>{post.body}</p>
        </div>
      ) : (
        <p>Post not found.</p>
      )}
    </div>
  );
};

export default PostDetail;
