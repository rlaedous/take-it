import axios from 'axios';

//조회

const getPosts = async () => {
  const response = await axios.get(
    `${import.meta.env.VITE_APP_GLITCH_SERVER_API_URL}/posts`
  );
  return response;
};

const addPost = async (newPost) => {
  await axios.post(
    `${import.meta.env.VITE_APP_GLITCH_SERVER_API_URL}/posts`,
    newPost
  );
};

export { getPosts, addPost };
