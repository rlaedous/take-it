import { useQuery } from '@tanstack/react-query';
// import { authCheckToken } from '../apis/auth';

import React from 'react';
const MyPage = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['loginStatus']
    // queryFn: authCheckToken
  });
  console.log('data', data);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div>
        <p>Error fetching user data</p>
        <p>Error details: {error.message}</p>
      </div>
    );
  }

  return (
    <div className='flex h-screen items-center justify-center'>
      <div className='rounded-lg bg-gray-500 p-4'>
        <h1 className='mb-4 text-4xl font-bold'>마이페이지</h1>
        {data && data.user ? (
          <>
            <p className='mb-2 text-lg'>유저 아이디: {data.user.userId}</p>

            <p className='text-lg'>닉네임: {data.user.nickname}</p>
          </>
        ) : (
          <p className='text-lg'>사용자 정보 없음</p>
        )}
      </div>
    </div>
  );
};
export default MyPage;
