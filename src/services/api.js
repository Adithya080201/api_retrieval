import axios from "axios";

const API_URL = "https://jsonplaceholder.typicode.com/posts";

export const fetchPosts = (start = 0, limit = 10) => {
  return axios.get(`${API_URL}?_start=${start}&_limit=${limit}`);
};

export const createPost = (post) => {
  return axios.post(API_URL, post);
};

export const fetchPostById = (id) => {
  return axios.get(`${API_URL}/${id}`);
};
