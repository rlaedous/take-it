import { useEffect, useMemo, useState } from 'react';
import { surveys } from '../shared/surveys';
import { getfilteredGifts } from '../utils/filterGift';
import { stringToArray } from '../utils/transformJson';
import gifts from '/public/gifts.json';
import { useDispatch, useSelector } from 'react-redux';
import { setGift } from '../redux/modules/giftSlice';
import CustomButton from '../components/common/CustomButton';
import { twMerge } from 'tailwind-merge';
import { useNavigate } from 'react-router';
const SurveyPage = () => {
  const transformedGifts = gifts.map((gift) => ({
    ...gift,
    toWhom: stringToArray(gift.toWhom),
    ages: stringToArray(gift.ages)
  }));

  const [currentQuestionIdx, setCurrentQuestionNum] = useState(0);
  const [results, setResults] = useState({
    gender: 'ㅇㅇ',
    whom: '',
    age: '',
    money: [],
    isT: false
  });
  const dispatch = useDispatch();

  const selectedGifts = useSelector((state) => state.gift);

  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const [isActiveNext, setIsActiveNext] = useState(false);

  const [showResult, setShowResult] = useState(false);

  const navigate = useNavigate();

  const currentQuestion = useMemo(() => {
    const question = surveys[currentQuestionIdx];

    if (question.questionType === 'age' && results.whom === '부모님') {
      return {
        ...question,
        answers: question.answers.slice(3, 5)
      };
    }

    return question;
  }, [currentQuestionIdx, results]);

  const handleClickAnswer = (answerVal, idx) => {
    const key = currentQuestion.questionType;
    setSelectedAnswer(idx);
    if (currentQuestion.questionType) {
      setResults({
        ...results,
        [key]: answerVal
      });
    }
    if (currentQuestionIdx === surveys.length - 1) {
      const filteredGift = getfilteredGifts(transformedGifts, results);
      console.log(filteredGift);
      if (filteredGift) {
        setShowResult(true);
        dispatch(setGift(filteredGift));
      }
    }
  };

  useEffect(() => {
    console.log('results', results);
  }, [results]);

  useEffect(() => {
    if (selectedGifts) {
      console.log(selectedGifts);
    }
  }, [selectedGifts]);

  const handleClickPrev = () => {
    setCurrentQuestionNum((prev) => {
      if (prev > 0) {
        return prev - 1;
      } else {
        return prev;
      }
    });
  };

  useEffect(() => {
    if (selectedAnswer === null) {
      setIsActiveNext(false);
    } else {
      setIsActiveNext(true);
    }
  }, [selectedAnswer]);
  const handleClickNext = () => {
    if (selectedAnswer === null) {
      return;
    }

    setCurrentQuestionNum((prev) => {
      if (prev < surveys.length - 1) {
        return prev + 1;
      } else {
        return prev;
      }
    });
    setSelectedAnswer(null);
  };

  const handleClickResult = () => {
    const filteredGift = getfilteredGifts(transformedGifts, results);
    if (filteredGift) {
      dispatch(setGift(filteredGift));
      navigate('/surveyResult'); // 결과 페이지로 이동
    }
  };
  return (
    <>
      <div className='py-5-sm relative mx-auto my-5 flex h-full max-w-screen-sm items-center justify-center'>
        <div className='flex h-full w-full flex-col items-center'>
          <p className=' mb-5 text-4xl text-gray-400'>
            Q{currentQuestion.order}.
          </p>
          <p className='pb-5 text-2xl'>{currentQuestion.question}</p>
          <div className='my-0 flex flex-col flex-wrap items-start'>
            {currentQuestion.answers.map((answer, index) => (
              <button
                className={`mx-auto my-5 rounded-full border-2 border-gray-300 px-40 py-6 text-lg ${selectedAnswer === index ? 'border-transparent bg-main text-black' : 'bg-white text-black'}`}
                onClick={() => {
                  handleClickAnswer(answer.value, index);
                }}
                key={index}>
                {answer.name}
              </button>
            ))}
          </div>
          <div className='absolute bottom-10'>
            {currentQuestionIdx === surveys.length - 1 ? (
              <button
                onClick={handleClickResult}
                className='mx-1 rounded-full border-2 border-black bg-black px-20 px-5 py-5 text-lg text-white'>
                결과보기
              </button>
            ) : (
              <>
                <button
                  className='mx-1 rounded-full bg-gray-200 px-20 py-5 text-lg text-gray-500'
                  onClick={handleClickPrev}>
                  이전으로
                </button>
                <button
                  className={twMerge(
                    `mx-1 rounded-full bg-gray-200 px-20 py-5 text-lg text-gray-500 ${isActiveNext ? 'bg-black text-white' : 'text-gray-500'}`
                  )}
                  onClick={handleClickNext}>
                  다음으로
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      {showResult ? (
        selectedGifts.length > 0 ? (
          selectedGifts.map((gift, index) => (
            <div key={index}>
              {index + 1}.{gift.name}
            </div>
          ))
        ) : (
          <div>결과가 없습니다</div>
        )
      ) : null}
    </>
  );
};

export default SurveyPage;
