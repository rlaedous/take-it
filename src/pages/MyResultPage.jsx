import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect } from 'react';

const MyResultPage = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['loginStatus']
  });

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
        console.log('a.gifts', a);
      } catch (error) {
        console.error('Error sending results to server:', error);
      }
    };

    // 함수 호출
    sendResultsToServer();
  }, [data, isLoading]);

  return <></>;
};

export default MyResultPage;
