import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addComment, deleteComment, getComments } from '../apis/comments';
import { useState } from 'react';
import { useParams } from 'react-router';
import { getPostsById } from '../apis/posts';
import CustomModal from '../components/common/CustomModal';

const CommunityDetail = () => {
  const { id } = useParams();
  const [comment, setComment] = useState('');
  const { data } = useQuery({
    queryKey: ['loginStatus']
  });

  const {
    isLoading,
    isError,
    data: comments
  } = useQuery({
    queryKey: ['comments'],
    queryFn: getComments
  });

  const { data: posts } = useQuery({
    queryKey: ['posts', id],
    queryFn: () => getPostsById(id)
  });

  const queryClient = useQueryClient();

  const mutationAdd = useMutation({
    mutationFn: addComment,
    onSuccess: () => {
      queryClient.invalidateQueries('comments');
    },
    onError: (error) => {
      alert(error.message);
    }
  });

  const mutationDelete = useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      queryClient.invalidateQueries('comments');
    },
    onError: (error) => {
      alert(error.message);
    }
  });

  const handleChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!comment.trim()) return; // 댓글 내용이 비어있으면 제출하지 않음
    handleAddComment(comment);
    setComment(''); // 댓글 입력 필드 초기화
  };

  const handleAddComment = (comment) => {
    const newComment = {
      comment,
      createdAt: new Date(),
      writer: data.user.id,
      postId: id,
      nickname: data.user.nickname
    };
    mutationAdd.mutate(newComment);
  };

  const handleDeleteComment = (commentId) => {
    mutationDelete.mutate(commentId);
  };

  const [currentDeleteTargetId, setCurrentDeleteTargetId] = useState('');

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  if (isLoading) return <div>로딩중</div>;

  if (isError) return <div>에러</div>;

  return (
    <div className='container mx-auto mt-5 max-w-3xl bg-white p-8 shadow'>
      <div className='mx-auto rounded '>
        <h2 className='mb-4 text-2xl font-bold'>{posts?.data.title}</h2>
        <p className='text-gray-700'>{posts?.data.content}</p>
      </div>
      <div className='mt-40 rounded-md bg-gray-100 px-5 py-5'>
        <div className='mb-2'>
          {comments &&
            comments.data
              .filter((comment) => comment.postId === id)
              .map((comment) => (
                <div
                  className='border-b border-b-gray-300 py-2'
                  key={comment.id}>
                  <div className='flex justify-between'>
                    <div className='flex'>
                      <p>{comment.nickname}:</p>
                      <p>{comment.comment}</p>
                    </div>
                    {data.user.id === comment.writer && (
                      <p
                        className='cursor-pointer'
                        onClick={() => {
                          setIsDeleteModalOpen(true);
                          setCurrentDeleteTargetId(comment.id);
                        }}>
                        삭제
                      </p>
                    )}
                  </div>
                </div>
              ))}
        </div>
        <form onSubmit={handleSubmit} className='mb-2 text-center'>
          <textarea
            value={comment}
            onChange={handleChange}
            className='h-16 w-full resize-none rounded-md border p-2 '
            placeholder='댓글을 입력하세요...'
            required></textarea>
          <button
            type='submit'
            className='font-semibol mt-2 rounded-md bg-main px-4 py-2 text-white hover:text-fuchsia-800'>
            댓글 작성
          </button>
        </form>
      </div>
      <CustomModal
        closeModal={() => setIsDeleteModalOpen(false)}
        isOpen={isDeleteModalOpen}>
        진짜 삭제할 거임?
        <div>
          <button
            onClick={() => {
              setIsDeleteModalOpen(false);
              handleDeleteComment(currentDeleteTargetId);
            }}
            className='mt-5 rounded bg-main px-4 py-2 font-semibold text-white hover:text-fuchsia-800'>
            ㅇㅇ
          </button>
        </div>
      </CustomModal>
    </div>
  );
};

export default CommunityDetail;
