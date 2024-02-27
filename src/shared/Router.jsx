import MainPage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import MyPage from '../pages/MyPage';
import RoulettePage from '../pages/RoulettePage';
import SurveyPage from '../pages/SurveyPage';
import SurveyResultPage from '../pages/SurveyResultPage';
import Layout from '../components/common/layout';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { authCheckToken } from '../apis/auth';
import useFetchData from '../utils/useFetchData';
import { useEffect } from 'react';

export default function Router() {
  // const userAuth = async () => {
  //   const accessToken = localStorage.getItem('accessToken');
  //   const userData = await authCheckToken(accessToken);
  //   return { isLoggedIn: true, user: userData.data };
  // };

  // const { data, error, isLoading } = useQuery({
  //   queryKey: ['loginStatus'],
  //   queryFn: userAuth,
  //   onSuccess: () => {
  //     console.log('되라고 좀');
  //   },
  //   onError: (error) => {
  //     console.error('Error occurred:', error);
  //     alert('토큰없음 다시하셈;;');
  //     localStorage.clear();
  //   }
  // });

  //글로벌 state 화 시키기

  //느낀점 rtk 를 같이 사용할 수 있다는 사실을 망각하고 있었다.
  //굳이굳이 돌아서 쿼리만 쓸 필요가 있나,,,,,,,,

  // console.log('Data:', data);
  // console.log('Error:', error);
  // console.log('Loading:', isLoading);d

  const fetchData = useFetchData();

  useEffect(() => {
    console.log('app마운트');
    fetchData();
  }, []);

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/mypage' element={<MyPage />} />
          <Route path='/roulette' element={<RoulettePage />} />
          <Route path='/survey' element={<SurveyPage />} />
          <Route path='/surveyResult' element={<SurveyResultPage />} />
          <Route path='/' element={<MainPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
