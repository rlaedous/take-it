import { useEffect, useState } from 'react';
import { fetchWeatherData } from '../apis/weatherAPI';

const Weather = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const cities = [
    'Seoul',
    'Busan',
    'Incheon',
    'Daegu',
    'Daejeon',
    'Gwangju',
    'Ulsan',
    'Suwon'
  ]; // 한국 도시들

  const fetchData = async (cityName) => {
    if (!cityName) return;
    setLoading(true);
    try {
      const data = await fetchWeatherData(cityName);
      setWeatherData(data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(cities[0]);
  }, []);

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData(city);
  };

  const handleCityButtonClick = (cityName) => {
    fetchData(cityName);
  };

  // 함수를 통해 openweathermap의 아이콘 코드를 이미지 URL로 변환
  const getWeatherIconUrl = (iconCode) => {
    return `http://openweathermap.org/img/wn/${iconCode}.png`;
  };

  return (
    <div
      className='mx-auto  h-full max-w-main rounded-lg p-4'
      style={{ background: 'linear-gradient(to bottom, #E0BBE4, #957DAD)' }}>
      <h2 className='text-center'>날씨를 찾아보자</h2>
      <div className='mx-auto text-center'>
        <form onSubmit={handleSubmit} className='mt-4'>
          <input
            type='text'
            placeholder='도시명을 입력하세요'
            value={city}
            onChange={handleInputChange}
            className='rounded-md border border-gray-300 p-2 focus:border-purple-500 focus:outline-none'
          />
          <button
            type='submit'
            className='ml-2 rounded-md bg-purple-500 px-4 py-2 text-white hover:bg-purple-600 focus:bg-purple-600 focus:outline-none'>
            날씨 가져오기
          </button>
        </form>
        <div className='mt-4'>
          {cities.map((cityName, index) => (
            <button
              key={index}
              onClick={() => handleCityButtonClick(cityName)}
              className='mr-2 mt-2 rounded-md bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300 focus:bg-gray-300 focus:outline-none'>
              {cityName}
            </button>
          ))}
        </div>
        {loading ? (
          <p className='mt-4'>날씨 데이터를 불러오는 중...</p>
        ) : error ? (
          <p className='mt-4'>에러: {error.message}</p>
        ) : weatherData ? (
          <div className='weather_data relative mx-auto mt-4 w-1/2'>
            <h2 className='text-5xl'>{weatherData.name}</h2>
            <p>온도: {weatherData.main.temp}°C</p>
            <p className='absolute left-5 top-5'>
              날씨 상태:{' '}
              <img
                className='mx-auto w-[100px]'
                src={getWeatherIconUrl(weatherData.weather[0].icon)}
                alt='Weather Icon'
              />
            </p>

            <p>체감 온도: {weatherData.main.feels_like}°C</p>
            <p>습도: {weatherData.main.humidity}%</p>
            <p>기압: {weatherData.main.pressure}hPa</p>
            <p>풍속: {weatherData.wind.speed}m/s</p>
          </div>
        ) : (
          <p className='mt-4'>날씨 정보를 가져오려면 도시명을 입력하세요.</p>
        )}
      </div>
    </div>
  );
};

export default Weather;
