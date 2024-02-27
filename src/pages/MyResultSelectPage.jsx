import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const MyResultSelectPage = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['loginStatus']
  });

  const params = useParams();
  const [resultData, setResultData] = useState(null);

  useEffect(() => {
    const sendResultsToServer = async () => {
      try {
        // isLoading이 true이거나 data가 없는 경우에는 함수 실행을 막습니다.
        if (isLoading || !data) {
          return;
        }
        const response = await axios.get(
          `https://tungsten-flossy-van.glitch.me/surveyResults`
        );

        const filteredData = response.data.filter(
          (item) => item.id === parseInt(params.id)
        );
        setResultData(filteredData[0].gifts);
      } catch (error) {
        alert(error);
      }
    };
    sendResultsToServer();
  }, [data]);
  return (
    <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        resultData?.map((item, index) => (
          <div key={index} className='rounded border border-gray-300 p-4'>
            <div className='text-lg font-bold'>{item?.name}</div>

            <img
              src={item?.imageUrl}
              className='mt-2 rounded-2xl'
              alt={item?.name}
            />
          </div>
        ))
      )}
    </div>
  );
};
export default MyResultSelectPage;
