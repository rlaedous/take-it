import axios from 'axios';

export const jsonServerAPI = axios.create({
  baseURL: `${import.meta.env.VITE_APP_GLITCH_SERVER_API_URL}`
});

//조회

const getPosts = async () => {
  const response = await jsonServerAPI.get('/posts');
  return response;
};

const getPostsById = async (id) => {
  const response = await jsonServerAPI.get(`/posts/${id}`);
  return response;
};
const addPost = async (newPost) => {
  await jsonServerAPI.post('/posts', newPost);
};

const deletePost = async (id) => {
  const response = await jsonServerAPI.delete(`/posts/${id}`);
  return response.data;
};

export { deletePost, getPosts, addPost, getPostsById };
