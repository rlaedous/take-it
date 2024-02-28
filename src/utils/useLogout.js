import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router';

const useLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const logout = () => {
    localStorage.clear();
    queryClient.removeQueries('loginStatus');
    navigate('/login');
  };

  return logout;
};

export default useLogout;
