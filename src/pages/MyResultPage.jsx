import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router';

const MyResultPage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const loginStatus = queryClient.getQueryData(['loginStatus']);
  const { data: responseData, isLoading } = useQuery({
    queryKey: ['surveyResults'],
    queryFn: async () => {
      try {
        const { data } = await axios.get(
          'https://tungsten-flossy-van.glitch.me/surveyResults/'
        );
        return data;
      } catch (error) {
        console.log(error);
      }
    }
  });

  if (isLoading) return null;

  const sortedCreatedAtData = responseData.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    []
  );

  const filteredGiftList = sortedCreatedAtData
    .filter((item) => item.userId === loginStatus.user.id)
    .map((item) => ({
      id: item.id,
      createdAt: new Intl.DateTimeFormat('ko', {
        dateStyle: 'full',
        timeStyle: 'medium'
      }).format(new Date(item.createdAt)),
      gifts: item.gifts[0]
    }));

  return (
    <div className='flex min-h-full items-center justify-center'>
      {filteredGiftList.length > 0 ? (
        <div className='my-5 grid max-w-screen-xl grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5'>
          {filteredGiftList.map((item, index) => (
            <div
              onClick={() => navigate(`/myResult/${item.id}`)}
              key={index}
              className='flex cursor-pointer flex-col items-center justify-center rounded border border-gray-300 p-4 transition-transform hover:scale-105 hover:bg-main'>
              <div className='mb-5 text-3xl font-bold'>{item.gifts.name}</div>
              <div className='text-lg font-bold'>내가 선택한 선물 1등</div>
              <div className='flex items-center justify-center'>
                <img
                  src={item.gifts.imageUrl}
                  className='mt-2 rounded-2xl'
                  alt={item.name}
                />
              </div>
              <div className='mt-2 text-base font-bold'>
                설문한 날짜 <br />
                {item.createdAt}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className='text-xl font-bold'>설문 작성하러가셈ㅋㅋ</p>
      )}
    </div>
  );
};

export default MyResultPage;
