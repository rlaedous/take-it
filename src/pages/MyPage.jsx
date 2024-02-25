import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const MyPage = () => {
  // const [user, setUser] = useState(null);

  // const supabase = createClient(
  //   'https://iobugekkjqtobyqclnro.supabase.co',
  //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlvYnVnZWtranF0b2J5cWNsbnJvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDgzNDIwOTYsImV4cCI6MjAyMzkxODA5Nn0.kT3vZQjaFoeqlznJRGfEUkpUpbbEPz8xvSMJV4mRyLk'
  // );

  const supabase = createClient(
    import.meta.env.VITE_REACT_APP_SUPABASE_URL,
    import.meta.env.VITE_REACT_APP_SUPABASE_API_KEY
  );

  // const supabase = createClient(
  //   'https://wmxqimajpwpcjpktduqn.supabase.co',
  //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndteHFpbWFqcHdwY2pwa3RkdXFuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDg3ODAzNzUsImV4cCI6MjAyNDM1NjM3NX0.CnkWvKYrk0cwXUumProjpLr_viIKMJ4xEjH_MnhkrxI'
  // );
  // // useEffect를 사용하여 컴포넌트가 마운트될 때 한 번만 사용자 정보 가져오도록 변경
  // useEffect(() => {
  //   // 사용자 정보 가져오기
  //   const currentUser = supabase.auth.user();

  //   // 사용자 정보 업데이트
  //   setUser(currentUser);

  //   // 사용자 정보가 변경될 때마다 실행
  //   const subscription = supabase.auth.onAuthStateChange((_event, session) => {
  //     setUser(session?.user ?? null);
  //   });

  //   // 컴포넌트가 언마운트될 때 subscription 정리
  //   return () => {
  //     subscription.unsubscribe();
  //   };
  // }, [supabase]);
  const [testData, setTestData] = useState([]);

  useEffect(() => {
    getTestData();
  }, []);

  useEffect(() => {
    console.log('testData => ', testData);
  }, [testData]);

  const getTestData = async () => {
    try {
      const { data } = await supabase.from('Test').select();
      console.log('data => ', data);
      setTestData(data);
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };
  const user = {
    email: 'gwg03183@naver.com',
    created_at: '11111111'
  };
  return (
    // <!-- 마이페이지 HTML -->
    <div className='flex items-center justify-center h-screen'>
      <div className='bg-gray-100 p-4 rounded-lg'>
        <h1 className='text-4xl font-bold mb-4'>마이페이지</h1>
        {user ? (
          <>
            <p className='text-lg mb-2'>이메일: {user.email}</p>
            <p className='text-lg'>가입일: {user.created_at}</p>
          </>
        ) : (
          <p className='text-lg'>사용자 정보 없음</p>
        )}
      </div>
    </div>
  );
};

export default MyPage;
