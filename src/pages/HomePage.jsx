import { useNavigate } from 'react-router';
import present from '../assets/images/present.png';
import roulette from '../assets/images/roulette.png';

const HomePage = () => {
  const navigate = useNavigate();
  const clickSurvey = () => {
    navigate('/survey');
  };
  const clickRoulette = () => {
    navigate('/roulette');
  };
  return (
    <>
      <div className='w-main mx-auto flex justify-center gap-8 '>
        <div
          onClick={clickSurvey}
          className='flex h-[600px] w-[480px] cursor-pointer flex-col justify-around rounded-3xl bg-[#fff] text-center shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)]'>
          <h3 className='text-2xl font-bold'>이거 받어 ㅋㅋ</h3>
          <div>
            <img src={present} className='mx-auto' />
          </div>
          <span className='text-2xl font-bold'>설문조사</span>
        </div>
        <div
          onClick={clickRoulette}
          className='flex h-[600px] w-[480px] cursor-pointer flex-col justify-around rounded-3xl bg-[#fff] text-center shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)]'>
          <h3 className='text-2xl font-bold'>못고르겠어? 돌려</h3>
          <div>
            <img src={roulette} className='mx-auto' />
          </div>
          <span className='text-2xl font-bold'>랜덤선물</span>
        </div>
      </div>
    </>
  );
};

export default HomePage;
