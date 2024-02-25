import React, { useEffect, useState } from 'react';

const MyPage = () => {
  const user = {
    email: 'gwg03183@naver.com',
    created_at: Date.now().toString()
  };
  return (
    // <!-- 마이페이지 HTML -->
    <div className='flex h-screen items-center justify-center'>
      <div className='rounded-lg bg-gray-500 p-4'>
        <h1 className='mb-4 text-4xl font-bold'>마이페이지</h1>
        {user ? (
          <>
            <p className='mb-2 text-lg'>이메일: {user.email}</p>
            <p className='text-lg'>가입일: {user.created_at}</p>
          </>
        ) : (
          <p className='text-lg'>사용자 정보 없음</p>
        )}
      </div>
    </div>
  );
};

export default MyPage;
