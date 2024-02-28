import { useState } from 'react';
import CustomModal from '../components/common/CustomModal';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getPosts, addPost, deletePost } from '../apis/posts';
import { useNavigate } from 'react-router';
import { getTimeDifferenceString } from '../utils/time';
import Pagination from '../components/common/Pagination';

const Community = () => {
  const { data: userData } = useQuery({
    queryKey: ['loginStatus']
  });

  const {
    isLoading,
    isError,
    data: posts
  } = useQuery({
    queryKey: ['posts'],
    queryFn: getPosts
  });

  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

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

  const queryClient = useQueryClient();

  const mutationAdd = useMutation({
    mutationFn: addPost,
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
      userId: userData.user.id,
      nickname: userData.user.nickname
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
    if (!userData) {
      return;
    }
    handleAddPost(title.value, content.value);
    title.value = '';
    content.value = '';
  };

  const mutationDelete = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries('posts');
    },
    onError: (error) => {
      alert(error.message);
    }
  });

  const handleDeletePost = (postId) => {
    mutationDelete.mutate(postId);
  };

  const [isOpenModal, setIsOpenModal] = useState(false);

  const [currentDeleteTargetId, setCurrentDeleteTargetId] = useState('');

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const navigate = useNavigate();

  return (
    <div className='mx-auto h-full max-w-3xl px-4 py-8'>
      <div className='mb-8 text-right'>
        {userData && userData.user && (
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
                if (userData && userData.user) {
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
              {userData && post.userId === userData.user.id && (
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
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
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
