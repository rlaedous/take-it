import { useEffect, useMemo, useState } from 'react';
import { surveys } from '../shared/surveys';
import { getfilteredGifts } from '../utils/filterGift';
import { stringToArray } from '../utils/transformJson';
import gifts from '/public/gifts.json';
import { useDispatch, useSelector } from 'react-redux';
import { setGift, setSurveyResult } from '../redux/modules/surveyResultSlice';
// import CustomButton from '../components/common/CustomButton';
import { twMerge } from 'tailwind-merge';
import { useNavigate } from 'react-router';
import ProgressBar from '../components/common/ProgressBar';

const SurveyPage = () => {
  const transformedGifts = gifts.map((gift) => ({
    ...gift,
    toWhom: stringToArray(gift.toWhom),
    ages: stringToArray(gift.ages)
  }));

  const [currentQuestionIdx, setCurrentQuestionNum] = useState(0);
  const [result, setResult] = useState({
    gender: 'ㅇㅇ',
    whom: '',
    age: '',
    money: [],
    isT: false
  });
  const dispatch = useDispatch();

  const selectedGifts = useSelector((state) => state.surveyResult);

  const [currentSelectedAnswer, setCurrentSelectedAnswer] = useState(null);

  const [isActiveNext, setIsActiveNext] = useState(false);

  const [selectedAnswers, setSelectedAnswers] = useState([]);

  const navigate = useNavigate();

  const currentQuestion = useMemo(() => {
    const question = surveys[currentQuestionIdx];

    if (question.questionType === 'age' && result.whom === '부모님') {
      return {
        ...question,
        answers: question.answers.slice(3, 5)
      };
    }

    return question;
  }, [currentQuestionIdx, result]);

  const handleClickAnswer = (answerVal, idx) => {
    const key = currentQuestion.questionType;
    setCurrentSelectedAnswer(idx);
    if (currentQuestion.questionType) {
      setResult({
        ...result,
        [key]: answerVal
      });
    }
    const updatedSelectedAnswers = [...selectedAnswers];
    updatedSelectedAnswers[currentQuestionIdx] = idx; //
    setSelectedAnswers(updatedSelectedAnswers);
    if (currentQuestionIdx === surveys.length - 1) {
      increaseProgress();
    }
  };

  useEffect(() => {
    console.log('results', result);
  }, [result]);

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
    if (selectedAnswers[currentQuestionIdx] === undefined) {
      setIsActiveNext(false);
    } else {
      setIsActiveNext(true);
    }
  }, [selectedAnswers, currentQuestionIdx]);
  const handleClickNext = () => {
    if (selectedAnswers[currentQuestionIdx] === undefined) {
      return;
    }

    setCurrentQuestionNum((prev) => {
      if (prev < surveys.length - 1) {
        return prev + 1;
      } else {
        return prev;
      }
    });
    setCurrentSelectedAnswer(null);
    increaseProgress();
  };

  useEffect(() => {
    console.log('selectedAnswers', selectedAnswers);
  }, [selectedAnswers]);
  const handleClickResult = () => {
    const filteredGift = getfilteredGifts(transformedGifts, result);
    if (filteredGift) {
      dispatch(setGift(filteredGift));
      dispatch(setSurveyResult(result));
      navigate('/surveyResult'); // 결과 페이지로 이동
    }
  };
  const [progress, setProgress] = useState(0);
  const increaseProgress = () => {
    if (progress < 100) {
      setProgress(progress + 100 / surveys.length);
    }
  };
  return (
    <>
      <div className='py-5-sm relative mx-auto my-5 flex h-full max-w-screen-sm items-center justify-center'>
        <div className='flex h-full w-full flex-col items-center'>
          <ProgressBar progress={progress} />
          <p className=' mb-5 mt-3 text-4xl text-gray-400'>
            Q{currentQuestion.order}.
          </p>
          <p className='pb-5 text-2xl'>{currentQuestion.question}</p>
          <div className='my-0 flex flex-col flex-wrap items-start'>
            {currentQuestion.answers.map((answer, index) => (
              <button
                className={`mx-auto my-4 rounded-full border-2 border-gray-300 px-40 py-6 text-lg transition-transform duration-300 hover:scale-105 ${selectedAnswers[currentQuestionIdx] === index ? 'border-transparent bg-main text-black' : 'bg-white text-black'}`}
                onClick={() => {
                  handleClickAnswer(answer.value, index);
                }}
                key={index}>
                {answer.name}
              </button>
            ))}
          </div>
          <div className='absolute bottom-10'>
            <>
              <button
                className={twMerge(
                  `mx-1 rounded-full bg-gray-200 px-20 py-5 text-lg text-gray-500 ${currentQuestionIdx !== 0 ? 'bg-gray-500 text-white' : 'text-gray-500'}`
                )}
                onClick={handleClickPrev}>
                이전으로
              </button>
              {currentQuestionIdx === surveys.length - 1 ? (
                <button
                  onClick={handleClickResult}
                  className='mx-1 rounded-full  border-black bg-black px-20 py-5 text-lg text-white'>
                  결과보기
                </button>
              ) : (
                <button
                  className={twMerge(
                    `mx-1 rounded-full bg-gray-200 px-20 py-5 text-lg text-gray-500 ${isActiveNext ? 'bg-black text-white' : 'bg-gray-200 text-gray-500'}`
                  )}
                  onClick={handleClickNext}>
                  다음으로
                </button>
              )}
            </>
          </div>
        </div>
      </div>
    </>
  );
};

export default SurveyPage;
