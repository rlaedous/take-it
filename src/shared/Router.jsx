import MainPage from '../pages/HomePage';
import JoinPage from '../pages/JoinPage';
import LoginPage from '../pages/LoginPage';
import MyPage from '../pages/MyPage';
import RoulettePage from '../pages/RoulettePage';
import SurveyPage from '../pages/SurveyPage';
import SurveyResultPage from '../pages/SurveyResultPage';
import Layout from '../components/common/layout';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

export default function Router() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/mypage' element={<MyPage />} />
          <Route element={<JoinPage />} />
          <Route element={<RoulettePage />} />
          <Route path='/survey' element={<SurveyPage />} />
          <Route path='/surveyResult' element={<SurveyResultPage />} />
          <Route path='/' element={<MainPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
