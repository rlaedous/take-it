import { useState } from 'react';
import CustomModal from '../components/common/CustomModal';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getPosts, addPost, deletePost } from '../apis/posts';
import { useNavigate } from 'react-router';
import { getTimeDifferenceString } from '../utils/time';

const Community = () => {
  const { data } = useQuery({
    queryKey: ['loginStatus']
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // 페이지당 항목 수

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const {
    isLoading,
    isError,
    data: posts
  } = useQuery({
    queryKey: ['posts'],
    queryFn: getPosts
  });

  //포스트를 날짜 순서대로 정렬
  const sortedPosts = posts
    ? [...posts.data].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      )
    : [];

  const getPaginatedData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return sortedPosts.slice(startIndex, endIndex);
  };
  // 표시할 데이터
  const paginatedData = getPaginatedData();

  // 페이지 수 계산
  const totalPages = Math.ceil(sortedPosts.length / itemsPerPage);

  const [isOpenModal, setIsOpenModal] = useState(false);

  const queryClient = useQueryClient();

  const [currentDeleteTargetId, setCurrentDeleteTargetId] = useState('');

  const navigate = useNavigate();

  const mutationAdd = useMutation({
    mutationFn: addPost,
    onSuccess: () => {
      queryClient.invalidateQueries('posts');
    },
    onError: (error) => {
      alert(error.message);
    }
  });

  const mutationDelete = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries('posts');
    },
    onError: (error) => {
      alert(error.message);
    }
  });

  const handleAddPost = (title, content) => {
    const newPost = {
      title: title,
      content: content,
      createdAt: new Date(),
      userId: data.user.id,
      nickname: data.user.nickname
    };
    mutationAdd.mutate(newPost);
    setIsOpenModal(false); // 작성 모달 닫기
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { title, content } = e.target;
    if (title.value === '' || content.value === '') {
      return;
    }
    if (!data) {
      return;
    }
    handleAddPost(title.value, content.value);
    title.value = '';
    content.value = '';
  };

  const handleDeletePost = (postId) => {
    mutationDelete.mutate(postId);
  };

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  return (
    <div className='mx-auto h-full max-w-3xl px-4 py-8'>
      <div className='mb-8 text-right'>
        {data && data.user && (
          <button
            onClick={() => setIsOpenModal(true)}
            className='rounded bg-main px-4 py-2 font-semibold text-white hover:text-fuchsia-800'>
            새 글 작성하기
          </button>
        )}
      </div>
      <div className='grid grid-cols-1'>
        {isLoading ? (
          <div>로딩 중...</div>
        ) : isError ? (
          <div>에러 발생</div>
        ) : (
          posts &&
          paginatedData.map((post) => (
            <div
              onClick={() => {
                if (data && data.user) {
                  navigate(`/communityDetail/${post.id}`);
                } else {
                  navigate('/login');
                }
              }}
              key={post.id}
              className='flex cursor-pointer justify-between border-b border-b-gray-300 bg-white p-7 shadow'>
              <h2 className='s mb-2 flex-1 text-xl font-semibold'>
                {post.title}
              </h2>
              <p className='mr-10 text-gray-700'>
                {getTimeDifferenceString(new Date(post.createdAt))}
              </p>
              <p className='mr-5 text-gray-700'>{post.nickname}</p>
              {data && post.userId === data.user.id && (
                <p
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsDeleteModalOpen(true);
                    setCurrentDeleteTargetId(post.id);
                    //handleDeletePost(post.id, e);
                  }}>
                  삭제
                </p>
              )}
            </div>
          ))
        )}
      </div>
      <div className='mt-4 flex justify-between'>
        {/* 이전 페이지 버튼 */}
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
          className='cursor-pointer rounded bg-black px-4 py-2 font-bold text-white hover:bg-main hover:text-fuchsia-800'>
          이전
        </button>

        {/* 페이지 번호 버튼들 */}
        <div className='flex'>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              disabled={currentPage === index + 1}
              className={`mx-1 ${
                currentPage === index + 1
                  ? 'bg-main text-white'
                  : 'bg-gray-300 text-gray-700'
              } cursor-pointer rounded px-4 py-2 font-bold hover:bg-main hover:text-fuchsia-800`}>
              {index + 1}
            </button>
          ))}
        </div>

        {/* 다음 페이지 버튼 */}
        <button
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
          className='cursor-pointer rounded bg-black px-4 py-2 font-bold text-white hover:bg-main hover:text-fuchsia-800'>
          다음
        </button>
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
              className='h-40 w-full resize-none rounded-lg border border-gray-300 px-4 py-2'
              placeholder='글 내용을 입력하세요.'
              name='content'
            />
          </div>
          <input
            type='submit'
            className='mx-auto mt-5 cursor-pointer rounded-lg bg-main px-4 py-2 font-semibold text-white hover:text-fuchsia-800'
            value='작성하기'
          />
        </form>
      </CustomModal>
      <CustomModal
        closeModal={() => setIsDeleteModalOpen(false)}
        isOpen={isDeleteModalOpen}>
        진짜 삭제할 거임?
        <div>
          <button
            onClick={() => {
              setIsDeleteModalOpen(false);
              handleDeletePost(currentDeleteTargetId);
            }}
            className='mt-5 rounded bg-main px-4 py-2 font-semibold text-white hover:text-fuchsia-800'>
            ㅇㅇ
          </button>
        </div>
      </CustomModal>
    </div>
  );
};

export default Community;
