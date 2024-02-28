import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className='flex h-screen flex-col items-center justify-center'>
      <h1 className='mb-4 text-7xl font-bold'>404</h1>
      <h1 className='mb-4 text-4xl font-bold'>페이지를 찾을 수 없음</h1>
      <p className='mb-8 text-lg'>
        죄송합니다. 요청하신 페이지를 찾을 수 없습니다.
      </p>
      <Link to='/' className='text-main underline'>
        홈페이지로 돌아가기
      </Link>
    </div>
  );
};
export default NotFound;
