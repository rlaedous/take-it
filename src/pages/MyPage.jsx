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
    // queryFn: async () => {
    //   const accessToken = localStorage.getItem('accessToken');
    //   const userData = await authCheckToken(accessToken);
    //   console.log('data', data);
    //   console.log('userData', userData);

    //   return { isLoggedIn: true, user: userData.data };
    // }
  });
  const queryClient = useQueryClient();
  // const { mutate: mutateToProfile } = useMutation({
  //   mutationFn: profileChange,
  //   onSuccess: async () => {
  //     await queryClient.invalidateQueries(['loginStatus']);
  //   }
  // });

  const [isEditing, setIsEditing] = useState(false);
  const [newNickname, setNewNickname] = useState(data?.user?.nickname || '');
  const [newProfileImage, setNewProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const handleNicknameChange = (e) => {
    setNewNickname(e.target.value);
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
    }

    setNewProfileImage(file);
  };

  const handleToggleEditing = () => {
    setIsEditing((prev) => !prev);

    // 취소를 눌렀을 때 이미지 미리보기 초기화
    if (!isEditing) {
      setPreviewImage(null);
    }
  };

  const handleUpdateNickname = async () => {
    const formData = new FormData();

    if (isEditing) {
      formData.append('nickname', newNickname);
      formData.append('avatar', newProfileImage);
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

            {/* 프로필 이미지 표시 */}
            {previewImage ? (
              <img
                src={previewImage}
                alt='프로필 이미지 미리보기'
                className='mb-4 h-20 w-20 rounded-full object-cover'
              />
            ) : (
              <img
                src={data.user.avatar}
                alt='프로필 이미지'
                className='mb-4 h-20 w-20 rounded-full object-cover'
              />
            )}

            {isEditing ? (
              <>
                <label className='block text-sm font-medium text-gray-600'>
                  새로운 닉네임:
                </label>
                <input
                  type='text'
                  className='mt-1 w-full rounded-md border border-gray-300 p-2'
                  onChange={handleNicknameChange}
                  defaultValue={newNickname}
                />

                {/* 프로필 이미지 변경 입력 필드 */}
                <label className='mt-4 block text-sm font-medium text-gray-600'>
                  프로필 이미지 변경:
                </label>
                <input
                  type='file'
                  accept='image/*'
                  onChange={handleProfileImageChange}
                  className='mt-1'
                />
              </>
            ) : (
              <p className='mb-2 text-lg'>닉네임: {data.user.nickname}</p>
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
