import Router from './shared/Router.jsx';
import './App.css';
import { QueryClient, QueryClientProvider, useQuery} from '@tanstack/react-query';
import { useEffect } from 'react';
import { authCheckToken } from './apis/auth.js';



function App() {

  const queryClient = new QueryClient();

  const fetchData = async () => {
    const accessToken = localStorage.getItem('accessToken');
    const avatar = localStorage.getItem('avatar');
    const nickname = localStorage.getItem('nickname');
    const userId = localStorage.getItem('userId');

    if (accessToken) {
      try {
        const userData = await authCheckToken(accessToken);

        queryClient.setQueryData(['loginStatus'], {
          isLoggedIn: true,
          user: {accessToken, avatar, nickname, userId},
        });
      } catch (error) {
        console.error('Error checking token:', error);
      }
    }
  };

  // 컴포넌트가 마운트될 때 fetchData 함수 실행
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Router />
    </QueryClientProvider>
  );
}

export default App;
