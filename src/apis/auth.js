import axios from 'axios';

const authAPI = axios.create({
  baseURL: `${import.meta.env.VITE_APP_API_URL}`
});

export const authLogin = async ({ id, password }) => {
  const response = await authAPI.post('/login', { id, password });
  return response;
};
