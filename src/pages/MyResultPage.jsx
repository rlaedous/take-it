import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

const MyResultPage = () => {
  const [filteredData, setFilteredData] = useState([]);

  const { data, isLoading } = useQuery({
    queryKey: ['loginStatus']
  });

  const navigate = useNavigate();

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

        const filteredUserId = response.data
          .filter((x) => x.userId === data.user.id)
          .map((x) => x.gifts);
        const filteredData = filteredUserId.map((x) => x[0]);
        setFilteredData(filteredData); // 상태 업데이트
      } catch (error) {
        console.error('Error sending results to server:', error);
      }
    };

    // 함수 호출
    sendResultsToServer();
  }, [data, isLoading]);

  return (
    <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
      {filteredData?.map((item, index) => (
        <div
          onClick={() => navigate('/surveyResult')}
          key={index}
          className='rounded border border-gray-300 p-4'>
          <div className='text-lg font-bold'>{item?.name}</div>
          <img
            src={item?.imageUrl}
            className='mt-2 rounded-2xl'
            alt={item?.name}
          />
        </div>
      ))}
    </div>
  );
};

export default MyResultPage;
