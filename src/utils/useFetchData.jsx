import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { authCheckToken } from '../apis/auth';

const useFetchData = () => {
  const queryClient = useQueryClient();

  const fetchData = async () => {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) {
      try {
        const userData = await authCheckToken(accessToken);
        const { data } = userData;
        const { id, nickname, avatar } = data;

        queryClient.setQueryData(['loginStatus'], {
          isLoggedIn: true,
          user: { accessToken, avatar, nickname, id }
        });
      } catch (error) {
        console.error('Error checking token:', error);
        localStorage.clear();
        alert('로그인 토큰이 만료되었습니다. 다시 로그인해주세요');
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // 빈 의존성 배열로 설정하여 컴포넌트가 마운트될 때 한 번만 실행

  return fetchData;
};

export default useFetchData;
