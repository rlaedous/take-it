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
  console.log('params', params);
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
        const filteredUserId = response.data
          .filter((x) => x.userId === data.user.id)
          .map((x) => x.gifts);
        console.log('filteredUserId', filteredUserId);

        const filteredData = filteredUserId.map((x) => x);
        console.log('filteredData', filteredData);
        // const filteredUserId = response.data
        //   .filter((x) => x.userId === data.user.id)
        //   .map((x) => x.gifts);
        // console.log('filteredUserId', filteredUserId);

        // const filteredUserId = response.data
        //   .filter((x) => x.userId === data.user.id)
        //   .map((x) => x.gifts)
        //   .flat();
        // console.log('filteredUserId', filteredUserId);

        // const currentPageArray = filteredUserId[params.id - 1]; // params.id는 문자열이므로 숫자로 변환하고 1을 빼줍니다.
        // console.log('currentPageArray', currentPageArray);
        // const filteredFirstData = currentPageArray.find(
        //   (x) => x.id === parseInt(params.id)
        // );
        // console.log('filteredFirstData', filteredFirstData);

        // console.log('response', response);
        // const filteredUserId = response.data.filter((x) => x.gifts);

        // console.log('filteredUserId', filteredUserId);

        // const filteredData = filteredUserId.map((x) => x[0]);

        // console.log('filteredData', filteredData);
        //   .find((x) => x.id === parseInt(params.id));
        // console.log(
        //   'response.data',
        //   response.data.filter((x) => x.gifts).map((x) => x.gifts)
        // );

        // const filteredUserId = response.data
        //   .filter((x) => x.userId === data.user.id)
        //   .map((x) => x.gifts);
        // console.log('filteredUserId', filteredUserId);
        // const filteredUserId = response.data
        //   .filter((x) => x.userId === data.user.id)
        //   .map((x) => x.gifts)

        //   .flat();

        // console.log('filteredUserId', filteredUserId);

        // const filteredData = filteredUserId.find(
        //   (x) => x.userId === parseInt(params.id)
        // );
        // console.log('filteredData', filteredData);
        // const filteredFirstData = filteredData.find(
        //   (x) => x.id === parseInt(params.id)
        // );
        // console.log('filteredFirstData', filteredFirstData);
        setResultData(filteredData);
      } catch (error) {
        console.error('Error fetching result data:', error);
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
