import { useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';

const SurveyResultPage = () => {
  const selectedGifts = useSelector((state) => state.surveyResult.gifts);
  console.log('선택', selectedGifts);
  const results = useSelector((state) => state.surveyResult.surveyResult);
  const { data } = useQuery({
    queryKey: ['loginStatus']
  });
  const navigate = useNavigate();
  const [isResultSaved, setIsResultSaved] = useState(false);
  useEffect(() => {
    if (selectedGifts === null) {
      alert('설문조사페이지로 이동');
      navigate('/survey'); // 선택된 선물이 없으면 /survey 페이지로 이동
    }
  }, [selectedGifts, navigate]);
  const handleResultSave = async () => {
    try {
      if (!isResultSaved) {
        const response = await axios.post(
          'https://tungsten-flossy-van.glitch.me/surveyResults',
          {
            selectedGifts,
            userId: data.user.id
          }
        );
        console.log(response.data);
        setIsResultSaved(true); // 결과 저장 후 상태 업데이트
        return response.data;
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className='mx-auto max-w-main'>
      <h3 className='my-3 text-center text-2xl font-bold'>너가 줄 선물은</h3>
      <div className='surveyResultBox flex gap-4'>
        {selectedGifts && selectedGifts.length ? (
          selectedGifts.map((gift, index) => (
            <div
              key={index}
              className='w-[30%] rounded-3xl bg-[#fff] shadow-[3.0px_6.0px_8.0px_rgba(0,0,0,0.38)]'>
              <div>
                <h3 className='my-4 text-center text-3xl'>{index + 1}위</h3>
                <p className='mx-auto flex h-[300px] w-2/3 items-center overflow-hidden bg-gray-50'>
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
      {selectedGifts && (
        <div className='mx-auto my-8 h-[100px] w-1/2 border border-black'>
          {`#${results.gender === 'F' ? '여자' : '남자'} 
 #${results.age.replace('s', '대')}
 #${results.whom}선물
 `}
        </div>
      )}

      <button onClick={handleResultSave} disabled={isResultSaved}>
        {isResultSaved === true ? '저장 완료!' : '결과 저장'}
      </button>
    </div>
  );
};

export default SurveyResultPage;
