import { useState } from 'react';
import { authLogin, authRegister } from '../apis/auth';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom/dist';
import { toast } from 'react-toastify';

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
        user: {
          ...data.data,
          id: data.data.userId
        }
      });
      toast.success('로그인 성공');
      localStorage.setItem('accessToken', data.data.accessToken);
      localStorage.setItem('avatar', data.data.avatar);
      localStorage.setItem('id', data.data.userId);
      localStorage.setItem('nickname', data.data.nickname);
      navigate('/');
    },
    onError: (error) => {
      toast.error('로그인 실패: 아이디, 비밀번호를 확인해주세요.');
    }
  });

  const registerMutation = useMutation({
    mutationFn: authRegister,
    onSuccess: () => {
      toast.success('회원가입 성공');
      setIsRegister(false);
    },
    onError: (error) => {
      toast.error(error.request.response);
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isRegister) {
      if (password !== passwordConfirm) {
        toast.error('비밀번호가 서로 달라요');
        return;
      }
      registerMutation.mutate({ id, password, nickname });
      setId('');
      setPassword('');
    } else {
      loginMutation.mutate({ id, password });
    }
  };

  return (
    <div className='flex h-full items-center justify-center bg-gray-50'>
      <div className='w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-md'>
        <div className='text-center text-3xl font-extrabold'>
          {isRegister ? '회원가입' : '로그인'}
        </div>
        <form className='space-y-6' onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor='id'
              className='block text-sm font-medium text-gray-600'>
              ID
            </label>
            <input
              placeholder='5자 이상 12자 미만'
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
              placeholder='5자 이상 12자 미만'
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
                placeholder='5자 이상 12자 미만'
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
                placeholder='3자 이상 12자 미만'
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
            className='w-full rounded-md border border-transparent bg-black px-4 py-2 text-white shadow-sm hover:bg-main focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'>
            {isRegister ? '가입해' : '로그인해'}
          </button>
        </form>
        <div className='text-center'>
          <button
            className='cursor-pointer text-black hover:underline'
            onClick={() => setIsRegister(!isRegister)}>
            {isRegister ? '로그인 해' : '없음 가입해;'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
