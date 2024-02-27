import {
  addGiftComments,
  getGiftComments,
  deleteGiftComments
} from '../../apis/giftComments';
import gifts from '../../../public/gifts.json';
import { IoClose } from 'react-icons/io5';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

const GiftModal = ({ isModalOpen, setIsModalOpen, selectedGift }) => {
  const gift = gifts.find((item) => item.id === selectedGift);
  const queryClient = useQueryClient();

  const [newComment, setNewComment] = useState('');

  const { data } = useQuery({
    queryKey: ['loginStatus']
  });

  const {
    isLoading,
    isError,
    data: giftComments
  } = useQuery({
    queryKey: ['giftComments'],
    queryFn: getGiftComments
  });

  const filteredGiftComments = giftComments?.data
    ? giftComments.data.filter((item) => item.giftId === selectedGift)
    : [];

  const addGiftCommentMutation = useMutation({
    mutationFn: addGiftComments,
    onSuccess: () => {
      queryClient.invalidateQueries('giftComments');
    },
    onError: (error) => {
      console.error(error);
    }
  });

  const deleteGiftCommentMutation = useMutation({
    mutationFn: deleteGiftComments,
    onSuccess: () => {
      queryClient.invalidateQueries('giftComments');
    },
    onError: (error) => {
      console.error(error);
    }
  });

  const handleAddGiftComments = () => {
    const newGiftComments = {
      userId: data.user.id,
      comment: newComment,
      avatar: data.user.avatar,
      nickname: data.user.nickname,
      giftId: gift.id
    };
    addGiftCommentMutation.mutate(newGiftComments);
  };

  const handleDeleteGiftComments = (id, userId) => {
    console.log(userId);
    console.log(data);
    if (userId === data.user.id) {
      deleteGiftCommentMutation.mutate(id);
    } else {
      alert('내 댓글만 삭제 가능합니다');
    }
  };
  if (isLoading) return;

  return (
    <>
      {isModalOpen ? (
        <div className='fixed left-0 top-0 flex h-full w-full items-center justify-center'>
          <div className='absolute h-full w-full bg-black opacity-50'></div>

          <div className='z-10 flex flex-col items-center rounded-lg bg-white p-6'>
            <div className='mb-4 flex w-full justify-between'>
              <p className='mb-4 text-lg font-bold'>{gift.name}</p>
              <IoClose
                className=' cursor-pointer'
                color='#333'
                size='30px'
                onClick={() => setIsModalOpen(false)}
              />
            </div>
            <div className='flex gap-6'>
              <img
                src={gift.imageUrl}
                alt='이미지'
                className='mb-4 max-h-full max-w-96 rounded'
              />
              <div className='bg-red w-full border-t-2 border-black'>
                <div className='mb-7 ml-1 flex h-80 border-b-2 border-black'>
                  {filteredGiftComments.length > 0 ? (
                    filteredGiftComments.map((item) => (
                      <div key={item.id}>
                        <img
                          className='h-7 w-7'
                          src={item.avatar}
                          alt='프로필'
                        />
                        <label>{item.nickname}</label>
                        <p>{item.comment}</p>
                        <button
                          onClick={() =>
                            handleDeleteGiftComments(item.id, item.userId)
                          }>
                          삭제
                        </button>
                      </div>
                    ))
                  ) : (
                    <label>의견을 달아보겠니</label>
                  )}
                </div>
                <input
                  className='h-12 w-80 border-gray-300 px-2'
                  placeholder='댓글 입력'
                  value={newComment}
                  onChange={(e) => {
                    setNewComment(e.target.value);
                  }}></input>
                <button
                  onClick={handleAddGiftComments}
                  className='h-12 rounded bg-main px-4 py-2 text-white'>
                  등록
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <> </>
      )}
    </>
  );
};

export default GiftModal;
