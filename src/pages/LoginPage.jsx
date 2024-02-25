import { useState } from 'react';
import { authLogin } from '../apis/auth';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const LoginPage = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: authLogin,
    onSuccess: (data) => {
      queryClient.setQueryData('loginStatus', {
        isLoggedIn: true,
        user: data
      });
      console.log(data);
    },
    onError: (error) => {
      console.error('Mutation error:', error);
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({ id, password });
  };
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50'>
      <div className='max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md'>
        <div className='text-3xl font-extrabold text-center'>Login</div>
        <form className='space-y-6' onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor='id'
              className='block text-sm font-medium text-gray-600'>
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
            <label
              htmlFor='password'
              className='block text-sm font-medium text-gray-600'>
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
          <button
            type='submit'
            className='w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
            Log in
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
