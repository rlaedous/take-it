import React, { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { authCheckToken } from '../apis/auth';
import { profileChange } from '../apis/auth';
import { useNavigate } from 'react-router';
import useFetchData from '../utils/useFetchData';

const MyPage = () => {
  const navigate = useNavigate();
  const fetchData = useFetchData();
  const { data, error, isLoading } = useQuery({
    queryKey: ['loginStatus']
  });
  console.log(data);

  const nickname = localStorage.getItem('nickname');

  const [isEditing, setIsEditing] = useState(false);
  const [newNickname, setNewNickname] = useState();

  const handleNicknameChange = (e) => {
    setNewNickname(e.target.value);
  };

  const handleToggleEditing = () => {
    setIsEditing((prev) => !prev);
  };
  const queryClient = useQueryClient();
  const handleUpdateNickname = async () => {
    const formData = new FormData();
    console.log('formData', formData);
    if (isEditing) {
      formData.append('nickname', newNickname);
      console.log('newNickname', newNickname);
    }
    try {
      localStorage.setItem('nickname', newNickname);

      await profileChange(formData);
      navigate('/');
      alert('변경이 완료되었습니다.');
      fetchData();
      // await queryClient.invalidateQueries(['loginStatus']);
    } catch (error) {
      console.error(error);
    }
    setIsEditing(false);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // if (error) {
  //   return (
  //     <div>
  //       <p>Error fetching user data</p>
  //       <p>Error details: {error.message}</p>
  //     </div>
  //   );
  // }

  return (
    <div className='flex h-screen items-center justify-center'>
      <div className='rounded-lg bg-gray-500 p-4'>
        <h1 className='mb-4 text-4xl font-bold'>마이페이지</h1>
        {data ? (
          <>
            <p className='mb-2 text-lg'>유저 아이디: {data.user.id}</p>
            {isEditing ? (
              <div className='mb-4'>
                <label className='block text-sm font-medium text-gray-600'>
                  새로운 닉네임:
                </label>
                <input
                  type='text'
                  className='mt-1 w-full rounded-md border border-gray-300 p-2'
                  value={newNickname}
                  onChange={handleNicknameChange}
                />
              </div>
            ) : (
              <p className='mb-2 text-lg'>닉네임: {nickname}</p>
            )}
            <div className='flex'>
              {isEditing ? (
                <>
                  <button
                    className='mr-2 rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600'
                    onClick={handleUpdateNickname}>
                    저장
                  </button>
                  <button
                    className='rounded-md bg-gray-500 px-4 py-2 text-white hover:bg-gray-600'
                    onClick={handleToggleEditing}>
                    취소
                  </button>
                </>
              ) : (
                <button
                  className='rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600'
                  onClick={handleToggleEditing}>
                  변경하기
                </button>
              )}
            </div>
          </>
        ) : (
          <p className='text-lg'>사용자 정보 없음</p>
        )}
      </div>
    </div>
  );
};

export default MyPage;
