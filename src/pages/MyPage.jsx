import React, { useState, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { profileChange } from '../apis/auth';
import useFetchData from '../utils/useFetchData';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

const MyPage = () => {
  const navigate = useNavigate();
  const fetchData = useFetchData();
  const { data, isLoading } = useQuery({
    queryKey: ['loginStatus']
  });
  const [isEditing, setIsEditing] = useState(false);
  const [newNickname, setNewNickname] = useState(data?.user?.nickname || '');
  const [newProfileImage, setNewProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = useRef(null);

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
      toast.success('변경이 완료되었습니다.');
      //alert('변경이 완료되었습니다.');
      fetchData();
    } catch (error) {
      toast.error(error);
      //alert(error);
    }
    setIsEditing(false);
  };

  const handleImageClick = () => {
    if (isEditing) {
      // 이미지를 클릭하면 파일 선택 창 열기
      fileInputRef.current.click();
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='flex h-full items-center justify-center bg-gray-50'>
      <div className='w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-md'>
        <h1 className='mb-4 text-center text-4xl font-bold'>마이페이지</h1>
        {data ? (
          <>
            <p className='mb-2 text-center text-xl'>
              유저 아이디: {data.user.id}
            </p>
            {/* 프로필 이미지 표시 */}
            {previewImage ? (
              <img
                src={previewImage}
                alt='프로필 이미지 미리보기'
                className='h-30 w-30 mx-auto mb-4 cursor-pointer rounded-full object-cover'
                onClick={handleImageClick}
              />
            ) : (
              <img
                src={data.user.avatar}
                alt='프로필 이미지'
                className={`h-30 w-30 mx-auto mb-4 rounded-full object-cover ${isEditing && 'cursor-pointer'}`}
                onClick={handleImageClick}
              />
            )}

            {isEditing ? (
              <>
                <label className='block text-sm font-medium text-gray-800'>
                  새로운 닉네임:
                </label>
                <input
                  type='text'
                  className='mt-1 w-full rounded-md border border-gray-300 p-2'
                  onChange={handleNicknameChange}
                  defaultValue={newNickname}
                />

                <input
                  type='file'
                  accept='image/*'
                  onChange={handleProfileImageChange}
                  className='mt-1 hidden'
                  ref={fileInputRef}
                />
              </>
            ) : (
              <p className='mb-2 text-center text-lg'>
                닉네임: {data.user.nickname}
              </p>
            )}

            <div className='flex justify-center space-x-4'>
              {isEditing ? (
                <>
                  <button
                    className='rounded-xl bg-main px-10 py-3 text-white hover:text-purple-800'
                    onClick={handleUpdateNickname}>
                    저장
                  </button>
                  <button
                    className='rounded-xl bg-main px-10 py-3 text-white hover:text-purple-800'
                    onClick={handleToggleEditing}>
                    취소
                  </button>
                </>
              ) : (
                <>
                  <button
                    className='rounded-xl bg-main px-7 py-3 font-bold text-white hover:text-purple-800'
                    onClick={handleToggleEditing}>
                    프로필 변경하기
                  </button>
                  <button
                    className='rounded-xl bg-main px-7 py-3 font-bold text-white hover:text-purple-800'
                    onClick={() => navigate('/myResult')}>
                    선물 추천 보기!
                  </button>
                </>
              )}
            </div>
          </>
        ) : (
          <p className='text-center text-lg'>사용자 정보 없음</p>
        )}
      </div>
    </div>
  );
};

export default MyPage;
