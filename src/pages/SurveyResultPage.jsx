import { useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const SurveyResultPage = () => {
  const selectedGifts = useSelector((state) => state.surveyResult.gifts);
  const results = useSelector((state) => state.surveyResult.surveyResult);
  const { data } = useQuery({
    queryKey: ['loginStatus']
  });
  //죄송합니다 사퇴하겠습니다...
  const handleResultSave = async () => {
    try {
      const response = await axios.post(
        'https://tungsten-flossy-van.glitch.me/surveyResults',
        {
          selectedGifts,
          userId: data.user.id
        }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className='mx-auto max-w-main'>
      <h3 className='my-3 text-center text-2xl font-bold'>너가 줄 선물은</h3>
      <div className='surveyResultBox flex gap-4'>
        {selectedGifts.length > 0 ? (
          selectedGifts.map((gift, index) => (
            <div
              key={index}
              className='w-[30%] rounded-3xl bg-[#fff] shadow-[3.0px_6.0px_8.0px_rgba(0,0,0,0.38)]'>
              <div>
                <h3 className='my-4 text-center text-3xl'>{index + 1}위</h3>
                <p className='mx-auto h-[300px] w-2/3 bg-gray-50'>
                  <img src={gift.imageUrl} className='rounded-2xl' alt='사진' />
                </p>
                <span className='my-4 block text-center'>{gift.name}</span>
              </div>
            </div>
          ))
        ) : (
          <div>결과가 없습니다</div>
        )}
      </div>
      <div className='mx-auto my-8 h-[100px] w-1/2 border border-black'>
        {`#${results.gender === 'F' ? '여자' : '남자'} 
        #${results.age.replace('s', '대')}
        #${results.whom}선물
        `}
      </div>

      <button onClick={handleResultSave}>결과 저장</button>
    </div>
  );
};

export default SurveyResultPage;
