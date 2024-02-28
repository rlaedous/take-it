import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const MyResultSelectPage = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['loginStatus']
  });

  const params = useParams();
  const [resultData, setResultData] = useState();

  useEffect(() => {
    const sendResultsToServer = async () => {
      try {
        if (isLoading || !data) {
          return;
        }

        const response = await axios.get(
          `https://tungsten-flossy-van.glitch.me/surveyResults`
        );

        const filteredData = response.data.filter(
          (item) => item.id === parseInt(params.id)
        );
        setResultData(filteredData[0]);
      } catch (error) {
        alert(error);
      }
    };
    sendResultsToServer();
  }, [data, isLoading]);

  return (
    <div className='flex min-h-full flex-col items-center justify-center'>
      <div className='mb-4 text-center'>
        <p className='mr-2 inline-block text-2xl font-bold text-purple-500'>
          {`#${resultData?.surveyResult.gender === 'F' ? '여자' : '남자'}`}
        </p>
        <p className='mr-2 inline-block text-2xl font-bold text-blue-500'>
          {`#${resultData?.surveyResult.age.replace('s', '대')}`}
        </p>
        <p className='mr-2 inline-block text-2xl font-bold text-green-500'>
          {`#${resultData?.surveyResult.whom}`}
        </p>
        <p className='mr-2 inline-block text-2xl font-bold text-red-500'>
          {`#${resultData?.surveyResult.isT === 'false' ? '실용적' : '감성적'}`}
        </p>
      </div>

      {isLoading ? (
        <p>Loading...</p>
      ) : resultData?.gifts.length > 1 ? (
        <div
          className={`grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-${resultData?.gifts.length === 2 ? '2' : 'auto'} mx-auto max-w-screen-xl`}>
          {resultData?.gifts.map((item, index) => (
            <div
              key={index}
              className='flex flex-col items-center rounded border border-gray-300 p-4'>
              <div className='text-lg font-bold'>{item?.name}</div>
              <img
                src={item?.imageUrl}
                className='mt-2 rounded-2xl'
                alt={item?.name}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className='mx-auto max-w-screen-xl'>
          <div className='flex flex-col items-center rounded border border-gray-300 p-4'>
            <div className='text-lg font-bold'>
              {resultData?.gifts[0]?.name}
            </div>
            <img
              src={resultData?.gifts[0]?.imageUrl}
              className='mt-2 rounded-2xl'
              alt={resultData?.gifts[0]?.name}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MyResultSelectPage;
