import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useEffect } from 'react';

import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

const MyResultPage = () => {
  const selectedGifts = useSelector((state) => state.surveyResult.gifts);
  console.log('selectedGifts', selectedGifts);
  const results = useSelector((state) => state.surveyResult.surveyResult);
  console.log('results', results);

  const aa = useSelector((state) => state);
  console.log('aa', aa);
  const { data, isLoading } = useQuery({
    queryKey: ['loginStatus']
  });
  console.log('data', data);
  const navigate = useNavigate();
  useEffect(() => {
    if (selectedGifts === null || selectedGifts.length === 0) {
      alert('저장된 결과가 없습니다!');
      navigate('/');
    }
  }, [selectedGifts]);

  useEffect(() => {
    const sendResultsToServer = async () => {
      try {
        // isLoading이 true이거나 data가 없는 경우에는 함수 실행을 막습니다.
        if (isLoading || !data) {
          return;
        }

        const response = await axios.get(
          'https://tungsten-flossy-van.glitch.me/surveyResults'
        );
        // console.log('response', response);
        console.log('response.data', response.data);
        console.log(
          'response.data.filter',
          response.data.filter((x) => x.userId === data.user.id)
        );
        const a = response.data.filter((x) => x.userId === data.user.id);
        const gift = a.gifts;
        console.log('a.gifts', a.gifts);
        console.log(gift);
      } catch (error) {
        console.error('Error sending results to server:', error);
      }
    };

    // 함수 호출
    sendResultsToServer();
  }, [selectedGifts, data, isLoading]);

  return (
    <>
      {selectedGifts?.length > 0 && (
        <div className='w-1/6'>
          <div>{selectedGifts[0].name}</div>
          <div>{selectedGifts[0].price}</div>
          <img
            src={selectedGifts[0].imageUrl}
            className='rounded-2xl'
            alt='사진'
          />
        </div>
      )}
      {/* {gift.map((x, index) => {
        <div key={index}>
          <div>{x.name}</div>
        </div>;
      })} */}
    </>
  );
};

export default MyResultPage;
