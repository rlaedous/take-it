import axios from 'axios';

//조회

const getComments = async () => {
  const response = await axios.get(
    `${import.meta.env.VITE_APP_GLITCH_SERVER_API_URL}/comments`
  );
  return response;
};

const addComment = async (newComment) => {
  await axios.post(
    `${import.meta.env.VITE_APP_GLITCH_SERVER_API_URL}/comments`,
    newComment
  );
};

export { getComments, addComment };
