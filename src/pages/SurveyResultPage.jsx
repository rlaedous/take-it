import { useSelector } from 'react-redux';

const SurveyResultPage = () => {
  const selectedGifts = useSelector((state) => state.gift);
  console.log(selectedGifts);
  return (
    <div>
      <h3>제 추천은요..</h3>
      <div>추천설명</div>
      <div className='surveyResultBox'>
        {selectedGifts.length > 0 ? (
          selectedGifts.map((gift, index) => (
            <div key={index}>
              {index + 1}.{gift.name}
            </div>
          ))
        ) : (
          <div>결과가 없습니다</div>
        )}
      </div>
    </div>
  );
};

export default SurveyResultPage;
