import axios from 'axios';

const getGiftComments = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_APP_GLITCH_SERVER_API_URL}/giftComments`
    );
    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
};

const addGiftComments = async (newComments) => {
  await axios.post(
    `${import.meta.env.VITE_APP_GLITCH_SERVER_API_URL}/giftComments`,
    newComments
  );
};

const deleteGiftComments = async (id) => {
  await axios.delete(
    `${import.meta.env.VITE_APP_GLITCH_SERVER_API_URL}/giftComments/${id}`
  );
};

export { getGiftComments, addGiftComments, deleteGiftComments };
