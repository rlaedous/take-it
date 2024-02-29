import axios from 'axios';

const fetchWeatherData = async (city) => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_OPENWEATHERMAP_API_KEY}`
    );
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch weather data');
  }
};

export { fetchWeatherData };
