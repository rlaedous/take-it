import axios from 'axios';

export const authAPI = axios.create({
  baseURL: `${import.meta.env.VITE_APP_API_URL}`
});

export const authLogin = async ({ id, password }) => {
  const response = await authAPI.post('/login', { id, password });
  return response;
};

export const authRegister = async ({ id, password, nickname }) => {
  const response = await authAPI.post('/register', { id, password, nickname });
  return response;
};

export const authCheckToken = async (token) => {
  const response = await authAPI.get(`/user`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  });
  return response;
};

export const profileChange = async (formData) => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    const { data } = await authAPI.patch(`/profile`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${accessToken}`
      }
    });

    return data;
  } catch (error) {
    throw error;
  }
};
