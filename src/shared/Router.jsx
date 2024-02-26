import MainPage from '../pages/HomePage';
import JoinPage from '../pages/JoinPage';
import LoginPage from '../pages/LoginPage';
import MyPage from '../pages/MyPage';
import RoulettePage from '../pages/RoulettePage';
import SurveyPage from '../pages/SurveyPage';
import SurveyResultPage from '../pages/SurveyResultPage';
import Layout from '../components/common/layout';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { authCheckToken } from '../apis/auth';
import BarChart from '../components/BarChart';

export default function Router() {
  const { data, error, isLoading } = useQuery({
    queryKey: ['loginStatus'],
    queryFn: async () => {
      const accessToken = localStorage.getItem('accessToken');
      const userData = await authCheckToken(accessToken);
      return { isLoggedIn: true, user: userData.data };
    },
    onSuccess: (fetchedData) => {
      console.log('Data fetched successfully:', fetchedData);
    },
    onError: (error) => {
      console.error('Error occurred:', error);
      alert('토큰없음 다시하셈;;');
      localStorage.clear();
    }
  });

  console.log('Data:', data);
  console.log('Error:', error);
  console.log('Loading:', isLoading);

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/mypage' element={<MyPage />} />
          <Route element={<JoinPage />} />
          <Route path='/roulette' element={<RoulettePage />} />
          <Route path='/survey' element={<SurveyPage />} />
          <Route path='/surveyResult' element={<SurveyResultPage />} />
          <Route path='/' element={<MainPage />} />
          <Route path='/chart' element={<BarChart />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
