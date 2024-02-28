import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router';

const useLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const logout = () => {
    console.log('로그아웃 실행');

    localStorage.clear();
    queryClient.removeQueries('loginStatus');
    navigate('/login');
  };

  return logout;
};

export default useLogout;
