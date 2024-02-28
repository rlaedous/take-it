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
import NotFound from '../pages/NotFound';

export default function Router() {
  const fetchData = useFetchData();

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/login'
          element={
            <Layout>
              <LoginPage />
            </Layout>
          }
        />
        <Route
          path='/mypage'
          element={
            <Layout>
              <MyPage />
            </Layout>
          }
        />
        <Route
          path='/myResult'
          element={
            <Layout>
              <MyResultPage />
            </Layout>
          }
        />
        <Route
          path='/myResult/:id'
          element={
            <Layout>
              <MyResultSelectPage />
            </Layout>
          }
        />
        <Route
          path='/roulette'
          element={
            <Layout>
              <RoulettePage />
            </Layout>
          }
        />
        <Route
          path='/map'
          element={
            <Layout>
              <MapPage />
            </Layout>
          }
        />
        <Route
          path='/survey'
          element={
            <Layout>
              <SurveyPage />
            </Layout>
          }
        />
        <Route
          path='/surveyResult'
          element={
            <Layout>
              <SurveyResultPage />
            </Layout>
          }
        />
        <Route
          path='/'
          element={
            <Layout>
              <MainPage />
            </Layout>
          }
        />
        <Route
          path='/community'
          element={
            <Layout>
              <Community />
            </Layout>
          }
        />
        <Route
          path='/communityDetail/:id'
          element={
            <Layout>
              <CommunityDetail />
            </Layout>
          }
        />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
