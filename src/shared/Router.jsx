import MainPage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import MyPage from '../pages/MyPage';
import RoulettePage from '../pages/RoulettePage';
import SurveyPage from '../pages/SurveyPage';
import SurveyResultPage from '../pages/SurveyResultPage';
import Layout from '../components/common/layout';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import useFetchData from '../utils/useFetchData';
import { useEffect } from 'react';
import MyResultPage from '../pages/MyResultPage';
import Community from '../pages/Community';
import CommunityDetail from '../pages/CommunityDetail';
import MapPage from '../pages/MapPage';
import MyResultSelectPage from '../pages/MyResultSelectPage';

export default function Router() {
  const fetchData = useFetchData();

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/mypage' element={<MyPage />} />
          <Route path='/myResult' element={<MyResultPage />} />
          <Route path='/myResult/:id' element={<MyResultSelectPage />} />
          <Route path='/roulette' element={<RoulettePage />} />
          <Route path='/map' element={<MapPage />} />
          <Route path='/survey' element={<SurveyPage />} />
          <Route path='/surveyResult' element={<SurveyResultPage />} />
          <Route path='/' element={<MainPage />} />
          <Route path='/community' element={<Community />} />
          <Route path='/communityDetail/:id' element={<CommunityDetail />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
