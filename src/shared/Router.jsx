import Home from '../pages/HomePage';
import JoinPage from '../pages/JoinPage';
import LoginPage from '../pages/LoginPage';
import MyPage from '../pages/MyPage';
import RoulettePage from '../pages/RoulettePage';
import SurveyPage from '../pages/SurveyPage';
import SurveyResultPage from '../pages/SurveyResultPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/mypage' element={<MyPage />} />
        <Route element={<JoinPage />} />
        <Route path='/roulette' element={<RoulettePage />} />
        <Route path='/survey' element={<SurveyPage />} />
        <Route element={<SurveyResultPage />} />
        <Route path='/' element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
