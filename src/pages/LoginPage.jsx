import { useState } from 'react';
import { authLogin, authRegister } from '../apis/auth';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom/dist';

const LoginPage = () => {
  const navigate = useNavigate();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [nickname, setNickname] = useState('');
  const [isRegister, setIsRegister] = useState(false);

  const queryClient = useQueryClient();
  const loginMutation = useMutation({
    mutationFn: authLogin,
    onSuccess: (data) => {
      queryClient.setQueryData('loginStatus', {
        isLoggedIn: true,
        user: data.data
      });
      console.log(data.data);
      localStorage.setItem('accessToken', data.data.accessToken);
      localStorage.setItem('avatar', data.data.avatar);
      localStorage.setItem('userId', data.data.userId);
      localStorage.setItem('nickname', data.data.nickname);
      navigate('/');
    },
    onError: (error) => {
      console.error('Mutation error:', error);
    }
  });

  const registerMutation = useMutation({
    mutationFn: authRegister,
    onSuccess: (data) => {
      alert(data.data)
      alert("로그인 하러가")
      setIsRegister(false)
    },
    onError: (error)=> {
      alert(error.request.response)
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isRegister) {
      // 회원가입
      // 패스워드 일치 여부 확인
      if (password !== passwordConfirm) {
        console.error('Passwords do not match');
        return;
      }
      registerMutation.mutate({id, password, nickname})
    } else {
      // 로그인
      loginMutation.mutate({ id, password });
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50'>
      <div className='max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md'>
        <div className='text-3xl font-extrabold text-center'>
          {isRegister ? 'Sign Up' : 'Log In'}
        </div>
        <form className='space-y-6' onSubmit={handleSubmit}>
          <div>
            <label htmlFor='id' className='block text-sm font-medium text-gray-600'>
              ID
            </label>
            <input
              id='id'
              type='text'
              className='mt-1 p-2 w-full border rounded-md'
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor='password' className='block text-sm font-medium text-gray-600'>
              Password
            </label>
            <input
              id='password'
              type='password'
              className='mt-1 p-2 w-full border rounded-md'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {isRegister && (
            <div>
              <label htmlFor='password-confirm' className='block text-sm font-medium text-gray-600'>
                Confirm Password
              </label>
              <input
                id='password-confirm'
                type='password'
                className='mt-1 p-2 w-full border rounded-md'
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
              />
            </div>
          )}
          {isRegister && (
            <div>
              <label htmlFor='nickname' className='block text-sm font-medium text-gray-600'>
                Nickname
              </label>
              <input
                id='nickname'
                type='text'
                className='mt-1 p-2 w-full border rounded-md'
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
              />
            </div>
          )}
          <button
            type='submit'
            className='w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
            {isRegister ? 'Sign Up' : 'Log In'}
          </button>
        </form>
        <div className='text-center'>
          <button
            className='text-indigo-500 hover:underline cursor-pointer'
            onClick={() => setIsRegister(!isRegister)}>
            {isRegister ? 'Already have an account? Log In' : 'Don\'t have an account? Sign Up'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
