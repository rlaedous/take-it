import { Link, useNavigate } from 'react-router-dom';
import arrow from '../../assets/images/arrow.png';
import logo from '../../assets/images/takeit_logo.png';
import { useEffect, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import useLogout from '../../utils/useLogout';
import { fetchWeatherData } from '../../apis/weatherAPI';

const Header = () => {
  const [cities] = useState([
    'Seoul',
    'Busan',
    'Incheon',
    'Daegu',
    'Daejeon',
    'Gwangju',
    'Ulsan',
    'Suwon'
  ]); // 한국 도시들
  const [currentCityIndex, setCurrentCityIndex] = useState(0);
  const [weatherData, setWeatherData] = useState(null);
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const data = await fetchWeatherData(cities[currentCityIndex]);
        setWeatherData(data);
      } catch (error) {
        console.error('Failed to fetch weather data:', error);
      }
    };

    fetchWeather();

    const timer = setInterval(() => {
      setCurrentCityIndex((prevIndex) => (prevIndex + 1) % cities.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [cities, currentCityIndex]);

  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태를 추적하는 상태값 추가
  const navigate = useNavigate();
  const menuRef = useRef(null);
  const logout = useLogout();

  const { data } = useQuery({
    queryKey: ['loginStatus']
  });

  useEffect(() => {
    // 'data'가 존재하면 로그인된 상태로 설정
    setIsLoggedIn(data !== undefined && data !== null);
  }, [data]);

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      handleMenuOnblur();
    }
  };
  const handleInfoClick = () => {
    setIsOpen(!isOpen);
  };
  const handleMypageClick = () => {
    navigate('/mypage');
    setIsOpen(!isOpen);
  };
  const handleLogout = () => {
    localStorage.clear(); // 로컬 스토리지에서 토큰 제거
    setIsLoggedIn(null);
    logout();
    toast.success('로그아웃 성공!!!');
  };
  const handleMenuOnblur = () => {
    setTimeout(() => {
      setIsOpen(false);
    }, 200);
  };
  const handleHomeBack = () => {
    navigate('/');
  };
  const handleMapPage = () => {
    navigate('/map');
  };

  const handleCommunity = () => {
    navigate('/community');
  };
  const handleWeather = () => {
    navigate('/weather');
  };
  return (
    <div className='flex min-h-[70px] items-center justify-between bg-main px-4'>
      <div className='flex items-center'>
        <div className='w-[200px]'>
          <img
            src={logo}
            alt='로고'
            className='cursor-pointer'
            onClick={handleHomeBack}
          />
        </div>
        <div className='ml-[60px] flex font-bold'>
          <div
            onClick={handleMapPage}
            className='mr-[60px] cursor-pointer hover:text-white'>
            가까운 가게
          </div>
          <div
            onClick={handleCommunity}
            className='mr-[60px] cursor-pointer hover:text-white '>
            커뮤니티
          </div>
          <div
            onClick={handleWeather}
            className='mr-[60px] cursor-pointer hover:text-white '>
            오늘의 날씨
          </div>
          {weatherData && isLoggedIn && (
            <div className='ml-10 flex'>
              <h1>{weatherData.name}의</h1>
              <p>현재 온도: {weatherData.main.temp}°C</p>
            </div>
          )}
        </div>
      </div>
      <div>
        {isLoggedIn ? (
          <>
            <div
              ref={menuRef}
              onClick={handleInfoClick}
              className={`${isOpen ? 'bg-white' : ''} relative flex w-[200px] cursor-pointer justify-around rounded-t-md py-2`}>
              <span className='text-xl font-bold'>{data.user.nickname}</span>
              {isOpen && (
                <div className='absolute top-11 w-[100%] rounded-b-md bg-white shadow-md'>
                  <div>
                    <p
                      className='cursor-pointer px-6 py-3 hover:bg-slate-600 hover:text-white'
                      onClick={handleMypageClick}>
                      내정보
                    </p>
                    <p
                      className='cursor-pointer px-6 py-3 hover:rounded-b-md hover:bg-slate-600 hover:text-white'
                      onClick={handleLogout}>
                      로그아웃
                    </p>
                  </div>
                </div>
              )}
              <img src={arrow} className='w-[20px]' />
            </div>
          </>
        ) : (
          <div>
            <Link to='/login' className='font-bold'>
              로그인/회원가입
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
