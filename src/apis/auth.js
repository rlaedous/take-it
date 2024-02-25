import axios from 'axios';

const authAPI = axios.create({
  baseURL: `${import.meta.env.VITE_APP_API_URL}`
});

export const authLogin = async ({ id, password }) => {
  const response = await authAPI.post('/login', { id, password });
  return response;
};

export const authRegister = async ({id, password, nickname}) => {
  const response = await authAPI.post('/register', {id, password, nickname});
  return response
}

export const authCheckToken = async (token) => {
  const response = await authAPI.get(`/user`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }
    });
    return response
} 