import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addComment, getComments } from '../apis/comments';
import React, { useMemo, useState } from 'react';
import { useParams } from 'react-router';
import { getPosts } from '../apis/posts';

const CommunityDetail = () => {
  const { id } = useParams();
  console.log(id);
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
    queryKey: ['posts'],
    queryFn: getPosts
  });

  const selectedPosts = useMemo(() => {
    if (posts) {
      console.log('post', posts);
      return posts.data.find((post) => post.id === parseInt(id));
    }
  }, [posts, id]);

  //   console.log('posts', selectedPosts);

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: addComment,
    onSuccess: () => {
      queryClient.invalidateQueries('comments');
      console.log('성공하였습니다');
    },
    onError: (error) => {
      console.log('Mutation error : ', error);
    }
  });

  console.log(comments);

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
      postId: id
    };
    mutation.mutate(newComment);
  };

  return (
    <div className='container mx-auto mt-5 bg-white p-8 shadow'>
      <div className='mx-auto rounded '>
        <h2 className='mb-4 text-2xl font-bold'>{selectedPosts?.title}</h2>
        <p className='text-gray-700'>{selectedPosts?.content}</p>
      </div>
      <div className='mb-5 mt-10 rounded bg-gray-200'>
        {comments &&
          comments.data
            .filter((comment) => comment.postId === id)
            .map((comment) => (
              <div className='border-b-black' key={comment.id}>
                <div className='flex'>
                  <p>{comment.writer}:</p>
                  <p>{comment.comment}</p>
                </div>
              </div>
            ))}
      </div>
      <form onSubmit={handleSubmit} className='mb-4'>
        <textarea
          value={comment}
          onChange={handleChange}
          className='h-32 w-full rounded-md border p-2'
          placeholder='댓글을 입력하세요...'
          required></textarea>
        <button
          type='submit'
          className='mt-2 rounded-md bg-blue-500 px-4 py-2 text-white'>
          댓글 작성
        </button>
      </form>
    </div>
  );
};

export default CommunityDetail;
