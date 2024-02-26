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
      queryClient.setQueryData(['loginStatus'], {
        isLoggedIn: true,
        user: data.data
      });
      console.log(data.data);
      localStorage.setItem('accessToken', data.data.accessToken);
      navigate('/');
    },
    onError: (error) => {
      console.error('Mutation error:', error);
    }
  });

  const registerMutation = useMutation({
    mutationFn: authRegister,
    onSuccess: (data) => {
      alert(data);
      alert('로그인 하러가');
      setIsRegister(false);
    },
    onError: (error) => {
      alert(error.request.response);
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isRegister) {
      // 회원가입
      // 패스워드 일치 여부 확인
      if (password !== passwordConfirm) {
        console.error('Passwords do not match');
        return;
      }
      registerMutation.mutate({ id, password, nickname });
    } else {
      // 로그인
      loginMutation.mutate({ id, password });
    }
  };

  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-50'>
      <div className='w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-md'>
        <div className='text-center text-3xl font-extrabold'>
          {isRegister ? 'Sign Up' : 'Log In'}
        </div>
        <form className='space-y-6' onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor='id'
              className='block text-sm font-medium text-gray-600'>
              ID
            </label>
            <input
              required
              id='id'
              type='text'
              className='mt-1 w-full rounded-md border p-2'
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor='password'
              className='block text-sm font-medium text-gray-600'>
              Password
            </label>
            <input
              required
              id='password'
              type='password'
              className='mt-1 w-full rounded-md border p-2'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {isRegister && (
            <div>
              <label
                htmlFor='password-confirm'
                className='block text-sm font-medium text-gray-600'>
                Confirm Password
              </label>
              <input
                id='password-confirm'
                type='password'
                className='mt-1 w-full rounded-md border p-2'
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
              />
            </div>
          )}
          {isRegister && (
            <div>
              <label
                htmlFor='nickname'
                className='block text-sm font-medium text-gray-600'>
                Nickname
              </label>
              <input
                id='nickname'
                type='text'
                className='mt-1 w-full rounded-md border p-2'
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
              />
            </div>
          )}
          <button
            type='submit'
            className='w-full rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'>
            {isRegister ? 'Sign Up' : 'Log In'}
          </button>
        </form>
        <div className='text-center'>
          <button
            className='cursor-pointer text-indigo-500 hover:underline'
            onClick={() => setIsRegister(!isRegister)}>
            {isRegister
              ? 'Already have an account? Log In'
              : "Don't have an account? Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
