import { useNavigate } from 'react-router';

const HomePage = () => {
  const navigate = useNavigate();
  const clickSurvey = () => {
    navigate('/survey');
  };
  return (
    <>
      <div className='w-main mx-auto flex justify-center gap-8 '>
        <div
          onClick={clickSurvey}
          className='flex flex-col cursor-pointer justify-around text-center w-[480px] h-[600px] bg-[#fff] shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] rounded-3xl'>
          <h3 className='font-bold text-2xl'>이거 받어 ㅋㅋ</h3>
          <div>
            <img src='../../public/images/present.png' className='mx-auto' />
          </div>
          <span className='text-2xl font-bold'>설문조사</span>
        </div>
        <div className='flex flex-col cursor-pointer justify-around text-center w-[480px] h-[600px] bg-[#fff] shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] rounded-3xl'>
          <h3 className='font-bold text-2xl'>못고르겠어? 돌려</h3>
          <div>
            <img src='../../public/images/roulette.png' className='mx-auto' />
          </div>
          <span className='text-2xl font-bold'>랜덤선물</span>
        </div>
      </div>
    </>
  );
};

export default HomePage;
