import Router from './shared/Router.jsx';
import './App.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect } from 'react';
import { authCheckToken } from './apis/auth.js';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import useFetchData from './utils/useFetchData.jsx';

const queryClient = new QueryClient({
  staleTime: Infinity
});
function App() {
  // 새로고침시 로그아웃을 막는 함수
  // const fetchData = async () => {
  //   const accessToken = localStorage.getItem('accessToken');
  //   // const avatar = localStorage.getItem('avatar');
  //   // const nickname = localStorage.getItem('nickname');
  //   // const id = localStorage.getItem('id');

  //   if (accessToken) {
  //     try {
  //       const userData = await authCheckToken(accessToken);
  //       const { data } = userData;
  //       const { id, nickname, avatar } = data;

  //       queryClient.setQueryData(['loginStatus'], {
  //         isLoggedIn: true,
  //         user: { accessToken, avatar, nickname, id }
  //       });
  //     } catch (error) {
  //       console.error('Error checking token:', error);
  //       localStorage.clear();
  //       alert('로그인 토큰이 만료되었습니다. 다시 로그인해주세요');
  //     }
  //   }
  // };

  // 컴포넌트가 마운트될 때 fetchData 함수 실행
  // const fetchData = useFetchData();

  // useEffect(() => {
  //   console.log('app마운트');
  //   fetchData();
  // }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
