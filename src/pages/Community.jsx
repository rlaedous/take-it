import { useState } from 'react';
import CustomModal from '../components/common/CustomModal';
import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getPosts, addPost } from '../apis/posts';
import { useNavigate } from 'react-router';

const Community = () => {
  const { data } = useQuery({
    queryKey: ['loginStatus']
  });

  const [isOpenModal, setIsOpenModal] = useState(false);

  const {
    isLoading,
    isError,
    data: posts
  } = useQuery({
    queryKey: ['posts'],
    queryFn: getPosts
  });

  const queryClient = useQueryClient();

  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: addPost,
    onSuccess: () => {
      queryClient.invalidateQueries('posts');
      console.log('성공하였습니다');
    },
    onError: (error) => {
      console.error('Mutation error:', error);
    }
  });

  const handleAddPost = (title, content) => {
    const newPost = {
      title: title,
      content: content,
      createdAt: new Date(),
      userId: data.user.id
    };
    mutation.mutate(newPost);
    setIsOpenModal(false); // 작성 모달 닫기
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { title, content } = e.target;
    console.log(title.value);
    console.log(content.value);
    if (title === '' || content === '') {
      return;
    }
    if (!data) {
      return;
    }

    handleAddPost(title.value, content.value);
  };

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='mb-8'>
        <button
          onClick={() => setIsOpenModal(true)}
          className='rounded bg-blue-500 px-4 py-2 font-semibold text-white'>
          새 글 작성하기
        </button>
      </div>
      <div className='grid grid-cols-1 gap-4'>
        {isLoading ? (
          <div>로딩 중...</div>
        ) : isError ? (
          <div>에러 발생</div>
        ) : (
          posts &&
          posts.data.map((post) => (
            <div
              onClick={() => {
                navigate(`/communityDetail/${post.id}`);
              }}
              key={post.id}
              className='cursor-pointer rounded bg-gray-100 p-4 shadow'>
              <h2 className='mb-2 text-xl font-semibold'>{post.title}</h2>
              <p className='text-gray-700'>{post.content}</p>
            </div>
          ))
        )}
      </div>
      <CustomModal
        isOpen={isOpenModal}
        closeModal={() => setIsOpenModal(false)}>
        <form onSubmit={handleSubmit}>
          <div className='flex flex-col items-center'>
            <input
              className='mb-4 mt-5 w-full rounded-lg border border-gray-300 px-4 py-2'
              placeholder='제목을 입력하세요.'
              name='title'
            />
            <textarea
              className='h-40 w-full rounded-lg border border-gray-300 px-4 py-2'
              placeholder='글 내용을 입력하세요.'
              name='content'
            />
          </div>
          <input
            type='submit'
            className='mx-auto mt-5 cursor-pointer rounded-lg bg-blue-500 px-4 py-2 font-semibold text-white'
            value='작성하기'
          />
        </form>
      </CustomModal>
    </div>
  );
};

export default Community;
