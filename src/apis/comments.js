import axios from 'axios';
import { jsonServerAPI } from './posts';

//조회

const getComments = async () => {
  const response = await jsonServerAPI.get('/comments');
  return response;
};

const addComment = async (newComment) => {
  await jsonServerAPI.post('/comments', newComment);
};

const deleteComment = async (id) => {
  const response = await jsonServerAPI.delete(`/comments/${id}`);
  return response.data;
};

export { getComments, addComment, deleteComment };
