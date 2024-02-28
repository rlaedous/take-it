import React from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const MyResultSelectPage = () => {
  const params = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ['surveyResults'],
    queryFn: async () => {
      try {
        const { data } = await axios.get(
          `https://tungsten-flossy-van.glitch.me/surveyResults/`
        );
        return data;
      } catch (error) {
        console(error);
      }
    }
  });

  const filteredData = data?.filter(
    (item) => item.id === parseInt(params.id)
  )[0];

  return (
    <div className='flex min-h-full flex-col items-center justify-center'>
      <div className='mb-4 text-center'>
        <p className='mr-2 inline-block text-2xl font-bold text-purple-500'>
          {`#${filteredData?.surveyResult.gender === 'F' ? '여자' : '남자'}`}
        </p>
        <p className='mr-2 inline-block text-2xl font-bold text-blue-500'>
          {`#${filteredData?.surveyResult.age.replace('s', '대')}`}
        </p>
        <p className='mr-2 inline-block text-2xl font-bold text-green-500'>
          {`#${filteredData?.surveyResult.whom}`}
        </p>
        <p className='mr-2 inline-block text-2xl font-bold text-red-500'>
          {`#${filteredData?.surveyResult.isT ? '실용적' : '감성적'}`}
        </p>
      </div>

      {isLoading ? (
        <p>Loading...</p>
      ) : filteredData.gifts.length > 1 ? (
        <div
          className={`grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-${filteredData?.gifts.length === 2 ? '2' : 'auto'} mx-auto max-w-screen-xl`}>
          {filteredData.gifts.map((item, index) => (
            <div
              key={index}
              className='flex flex-col items-center rounded border border-gray-300 p-4'>
              <div className='text-lg font-bold'>{item.name}</div>
              <img
                src={item.imageUrl}
                className='mt-2 rounded-2xl'
                alt={item.name}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className='mx-auto max-w-screen-xl'>
          <div className='flex flex-col items-center rounded border border-gray-300 p-4'>
            <div className='text-lg font-bold'>
              {filteredData.gifts[0].name}
            </div>
            <img
              src={filteredData.gifts[0].imageUrl}
              className='mt-2 rounded-2xl'
              alt={filteredData.gifts[0].name}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MyResultSelectPage;
