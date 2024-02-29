import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect, useState } from 'react';
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
        const filteredGiftList = response.data
          .filter((item) => item.userId === data.user.id)
          .map((item) => ({
            id: item.id,
            gifts: item.gifts[0]
          }));
        setFilteredData(filteredGiftList); // 상태 업데이트
      } catch (error) {
        alert(error);
      }
    };
    sendResultsToServer();
  }, [data, isLoading]);
  return (
    <div className='flex h-full justify-center'>
      <div
        className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
        style={{ maxWidth: '75%', margin: '20px auto', maxWidth: '1440px' }}>
        {filteredData?.map((item, index) => (
          <div
            onClick={() => navigate(`/myResult/${item.id}`)}
            key={index}
            className='flex flex-col items-center justify-center rounded border border-gray-300 p-4'>
            <div className='text-lg font-bold'>{item?.gifts.name}</div>
            <div className='text-lg font-bold'>현재 1등</div>
            <div className='flex items-center justify-center'>
              <img
                src={item?.gifts.imageUrl}
                className='mt-2 rounded-2xl'
                alt={item?.name}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default MyResultPage;
