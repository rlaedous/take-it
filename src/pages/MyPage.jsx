import React, { useState, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { profileChange } from '../apis/auth';
import useFetchData from '../utils/useFetchData';
import { useNavigate } from 'react-router';
import defaultAvatar from '../assets/images/defaultAvatar.jpg';
import { toast } from 'react-toastify';

const MyPage = () => {
  const navigate = useNavigate();
  const fetchData = useFetchData();
  const { data: loginData, isLoading } = useQuery({
    queryKey: ['loginStatus']
  });
  const [isEditing, setIsEditing] = useState(false);
  const [newNickname, setNewNickname] = useState(
    loginData?.user.nickname || ''
  );
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

    if (!isEditing) {
      setPreviewImage(null);
    }
  };

  const handleUpdateProfile = async () => {
    const formData = new FormData();

    if (isEditing) {
      formData.append('nickname', newNickname);
      formData.append('avatar', newProfileImage);
    }

    const nicknameChanged = loginData.user.nickname !== newNickname;
    const avatarChanged = isEditing && newProfileImage !== null;

    if (!nicknameChanged && !avatarChanged) {
      toast.error('변경사항이 없습니다');
      return;
    }

    if (nicknameChanged && !avatarChanged) {
      if (newNickname.trim() === '') {
        toast.error('닉네임을 입력하거나 이미지를 변경하세요');
        return;
      }
      toast.success('닉네임만 변경되었습니다');
    }

    if (!nicknameChanged && avatarChanged) {
      toast.success('이미지만 변경되었습니다');
    }

    if (nicknameChanged && avatarChanged) {
      if (newNickname.trim() === '') {
        toast.error('닉네임이 비어있습니다 ');
        return;
      }
      toast.success('닉네임과 이미지가 변경되었습니다');
    }

    try {
      localStorage.setItem('nickname', newNickname);
      await profileChange(formData);
      fetchData();
    } catch (error) {
      console.error(error);
    }

    setIsEditing(false);
  };

  const handleImageClick = () => {
    if (isEditing) {
      fileInputRef.current.click();
    }
  };

  if (isLoading) return null;

  return (
    <div className='flex h-full items-center justify-center bg-gray-50'>
      <div className='w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-md'>
        <h1 className='mb-4 text-center text-4xl font-bold'>마이페이지</h1>
        {loginData ? (
          <>
            <p className='mb-2 text-center text-xl font-bold'>
              유저 아이디: {loginData.user.id}
            </p>
            {previewImage ? (
              <img
                src={previewImage}
                alt='프로필 이미지 미리보기'
                className='h-30 w-30 mx-auto mb-4 cursor-pointer rounded-full object-cover'
                onClick={handleImageClick}
              />
            ) : (
              <img
                src={loginData.user.avatar ?? defaultAvatar}
                alt='프로필 이미지'
                className={`h-30 w-30 mx-auto mb-4 rounded-full object-cover ${isEditing && 'cursor-pointer'}`}
                onClick={handleImageClick}
              />
            )}

            {isEditing ? (
              <>
                <label className='block text-sm font-bold  text-gray-800'>
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
              <p className='mb-2 text-center text-lg font-bold'>
                닉네임: {loginData.user.nickname}
              </p>
            )}

            <div className='flex justify-center space-x-4'>
              {isEditing ? (
                <>
                  <button
                    className='rounded-xl bg-main px-10 py-3 text-white hover:text-purple-800'
                    onClick={handleUpdateProfile}>
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
