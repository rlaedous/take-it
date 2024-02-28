import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

const MyResultPage = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['loginStatus']
  });

  const [filteredData, setFilteredData] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const sendResultsToServer = async () => {
      try {
        if (isLoading || !data) {
          return;
        }

        const response = await axios.get(
          'https://tungsten-flossy-van.glitch.me/surveyResults'
        );
        const filteredGiftList = response.data
          .filter((item) => item.userId === data.user.id)
          .map((item) => ({
            id: item.id,
            createdAt: new Date(item.createdAt).toLocaleString('ko-KR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: 'numeric',
              minute: 'numeric',
              hour12: true
            }),
            gifts: item.gifts[0]
          }));
        console.log('filteredGiftList', filteredGiftList);

        setFilteredData(filteredGiftList);
      } catch (error) {
        toast(error);
      }
    };
    sendResultsToServer();
  }, [data, isLoading]);

  return (
    <div className='flex min-h-full items-center justify-center'>
      {filteredData?.length > 0 ? (
        <div className='my-5 grid max-w-screen-xl grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5'>
          {filteredData.map((item, index) => (
            <div
              onClick={() => navigate(`/myResult/${item.id}`)}
              key={index}
              className='flex cursor-pointer flex-col items-center justify-center rounded border border-gray-300 p-4 transition-transform hover:scale-105 hover:bg-main'>
              <div className='mb-5 text-3xl font-bold'>{item?.gifts.name}</div>
              <div className='text-lg font-bold'>내가 선택한 선물 1등</div>
              <div className='flex items-center justify-center'>
                <img
                  src={item?.gifts.imageUrl}
                  className='mt-2 rounded-2xl'
                  alt={item?.name}
                />
              </div>
              <div className='mt-2 text-base font-bold'>
                설문한 날짜 <br />
                {item?.createdAt}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className='text-xl font-bold'>현재 작성한 추천이 없습니다.</p>
      )}
    </div>
  );
};

export default MyResultPage;
