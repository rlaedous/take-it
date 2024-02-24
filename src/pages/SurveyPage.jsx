import { useEffect, useMemo, useState } from 'react';
import { surveys } from '../shared/surveys';
import { getfilteredGifts } from '../utils/filterGift';
import { stringToArray } from '../utils/transformJson';
import gifts from '/public/gifts.json';
import { useDispatch, useSelector } from 'react-redux';
import { setGift } from '../redux/modules/giftSlice';
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

  const handleClickAnswer = (answerVal) => {
    const key = currentQuestion.questionType;
    if (currentQuestion.questionType) {
      setResults({
        ...results,
        [key]: answerVal
      });
    }
    if (currentQuestionIdx === surveys.length - 1) {
      const filteredGift = getfilteredGifts(transformedGifts, results);
      console.log(filteredGift);
      dispatch(setGift(filteredGift));
    }
  };

  useEffect(() => {
    console.log(selectedGifts);
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
  const handleClickNext = () => {
    setCurrentQuestionNum((prev) => {
      if (prev < surveys.length - 1) {
        return prev + 1;
      } else {
        return prev;
      }
    });
  };

  return (
    <div>
      <p>survey</p>
      <div>
        <p>
          {currentQuestion.order}.{currentQuestion.question}
        </p>
        <div>
          {currentQuestion.answers.map((answer, index) => (
            <button
              onClick={() => {
                handleClickAnswer(answer.value);
              }}
              key={index}>
              {answer.name}
            </button>
          ))}
        </div>
        <div>
          <button onClick={handleClickPrev}>이전으로</button>
          <button onClick={handleClickNext}>다음으로</button>
        </div>
      </div>
    </div>
  );
};

export default SurveyPage;
