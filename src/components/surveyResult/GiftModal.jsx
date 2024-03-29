import {
  addGiftComments,
  getGiftComments,
  deleteGiftComments
} from '../../apis/giftComments';
import gifts from '../../../public/gifts.json';
import { IoClose } from 'react-icons/io5';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'react-toastify';

const GiftModal = ({ isModalOpen, setIsModalOpen, selectedGift }) => {
  const queryClient = useQueryClient();

  //giftDb 정보 get
  const gift = gifts.find((item) => item.id === selectedGift);

  //로그인 유저 정보 get
  const { data } = useQuery({
    queryKey: ['loginStatus']
  });

  //giftComments 데이터 로딩
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

  //댓글 관련 함수(스로틀링 넣자)
  const addGiftCommentMutation = useMutation({
    mutationFn: addGiftComments,
    onSuccess: () => {
      queryClient.invalidateQueries('giftComments');
      toast.success('댓글 작성 완료');
    },
    onError: (error) => {
      console.error(error);
      toast.error('댓글 작성 에러 발생');
    }
  });

  const deleteGiftCommentMutation = useMutation({
    mutationFn: deleteGiftComments,
    onSuccess: () => {
      queryClient.invalidateQueries('giftComments');
      toast.error('댓글 삭제 완료');
    },
    onError: (error) => {
      console.error(error);
    }
  });

  const [newComment, setNewComment] = useState('');

  const handleAddGiftComments = () => {
    if (data) {
      const newGiftComments = {
        userId: data.user.id,
        comment: newComment,
        avatar: data.user.avatar,
        nickname: data.user.nickname,
        giftId: gift.id
      };
      addGiftCommentMutation.mutate(newGiftComments);
    } else {
      toast.error('로그인 한 사용자만 가능합니다');
    }
  };

  const handleDeleteGiftComments = (id, userId) => {
    if (userId === data.user.id) {
      deleteGiftCommentMutation.mutate(id);
    } else {
      toast.error('내 댓글만 삭제 가능합니다');
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
                <div className='mb-7 ml-1 flex h-80 flex-col items-center border-b-2 border-black'>
                  {filteredGiftComments.length > 0 ? (
                    filteredGiftComments.map((item) => (
                      <div key={item.id} className='flex flex-row py-2'>
                        <div className='flex items-start'>
                          <div className='flex items-center space-x-4'>
                            <img
                              className='h-10 w-10 rounded-full'
                              src={item.avatar}
                              alt='프로필'
                            />
                            <div className='flex flex-col'>
                              <label className='font-semibold text-gray-700'>
                                {item.nickname}
                              </label>
                              <p className='text-gray-800'>{item.comment}</p>
                            </div>
                          </div>
                          <button
                            onClick={() =>
                              handleDeleteGiftComments(item.id, item.userId)
                            }
                            className='text-red-600 hover:text-red-800 focus:outline-none'>
                            삭제
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <label>의견을 달아보겠니</label>
                  )}
                </div>
                <input
                  maxLength={23}
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
