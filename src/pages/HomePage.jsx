import { useNavigate } from 'react-router';
import present from '../assets/images/present.png';
import roulette from '../assets/images/roulette.png';
import { toast } from 'react-toastify';

const HomePage = () => {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem('accessToken');

  const clickSurvey = () => {
    navigate('/survey');
  };
  const clickRoulette = () => {
    if (accessToken) {
      navigate('/roulette');
    } else {
      toast.error('로그인이 필요합니다.');
      navigate('/login');
    }
  };
  return (
    <>
      <h2 className='mt-[30px] text-center text-4xl font-bold text-[#333]'>
        선물 추천사이트
      </h2>
      <div className='mx-auto mt-[30px] flex max-w-main justify-center gap-8'>
        <div
          onClick={clickSurvey}
          className='homepage-container flex h-[560px] w-[440px] cursor-pointer flex-col justify-around rounded-3xl bg-[#fff] text-center shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)]'>
          <h3 className='text-2xl font-bold text-[#333]'>이거 받어 ㅋㅋ</h3>
          <div>
            <img src={present} className='mx-auto' />
          </div>
          <div>
            <span className='rounded-xl bg-main px-10 py-3 text-2xl font-bold text-white'>
              설문조사
            </span>
          </div>
        </div>
        <div
          onClick={clickRoulette}
          className='homepage-container flex h-[560px] w-[440px] cursor-pointer flex-col justify-around rounded-3xl bg-[#fff] text-center shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)]'>
          <h3 className='text-2xl font-bold text-[#333]'>못고르겠어? 돌려</h3>
          <div className='flex h-[280px] items-center'>
            <img src={roulette} className='mx-auto' />
          </div>
          <div>
            <span className='rounded-xl bg-main px-10 py-3 text-2xl font-bold text-white'>
              랜덤선물
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
