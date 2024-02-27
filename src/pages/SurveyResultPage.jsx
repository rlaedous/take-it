import { useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';

const SurveyResultPage = () => {
  const [videos, setVideos] = useState([]);
  const selectedGifts = useSelector((state) => state.surveyResult.gifts);
  console.log('선택', selectedGifts);
  const results = useSelector((state) => state.surveyResult.surveyResult);
  const { data } = useQuery({
    queryKey: ['loginStatus']
  });
  const navigate = useNavigate();
  const [isResultSaved, setIsResultSaved] = useState(false);
  //const gender = results.gender === 'F' ? '여자' : '남자';
  useEffect(() => {
    if (results && results.gender) {
      const gender = results.gender === 'F' ? '여자' : '남자';
      const searchId = encodeURIComponent(
        `${gender}, ${results.age}대 선물 추천`
      );
      const fetchVideos = async () => {
        try {
          const response = await axios.get(
            `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=3&q=${searchId}&type=video&key=${import.meta.env.VITE_APP_YOUTUBE_API_KEY}`
          );
          console.log(response.data);
          setVideos(response.data.items);
        } catch (error) {
          console.log(error);
        }
      };

      fetchVideos();
    }
  }, [results]);

  useEffect(() => {
    if (selectedGifts === null) {
      navigate('/survey'); // 선택된 선물이 없으면 /survey 페이지로 이동
    }
  }, [selectedGifts, navigate]);
  const handleResultSave = async () => {
    try {
      if (!isResultSaved) {
        const currentTime = new Date();
        const response = await axios.post(
          'https://tungsten-flossy-van.glitch.me/surveyResults',
          {
            selectedGifts,
            userId: data.user.id,
            createdAt: currentTime.toISOString()
          }
        );
        console.log(response.data);
        setIsResultSaved(true); // 결과 저장 후 상태 업데이트
        return response.data;
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className='mx-auto max-w-main text-center'>
      <h3 className='my-3 text-center text-2xl font-bold'>너가 줄 선물은</h3>
      <div className='surveyResultBox flex justify-center gap-4'>
        {selectedGifts && selectedGifts.length ? (
          selectedGifts.map((gift, index) => (
            <div
              key={index}
              className='w-[30%] rounded-3xl bg-[#fff] shadow-[3.0px_6.0px_8.0px_rgba(0,0,0,0.38)]'>
              <div>
                <h3 className='my-4 text-center text-3xl'>{index + 1}위</h3>
                <p className='mx-auto flex h-[300px] w-2/3 items-center overflow-hidden bg-gray-50'>
                  <img src={gift.imageUrl} className='rounded-2xl' alt='사진' />
                </p>
                <span className='mt-4 block text-center'>{gift.name}</span>
              </div>
            </div>
          ))
        ) : (
          <div>결과가 없습니다</div>
        )}
      </div>
      {selectedGifts && (
        <div className='mx-auto my-8  w-1/2 font-bold'>
          {`#${results.gender === 'F' ? '여자' : '남자'} 
 #${results.age.replace('s', '대')}
 #${results.whom}선물
 #${results.isT === 'false' ? '감성적' : '실용적'}
 `}
        </div>
      )}
      {/*비디오 부분*/}
      <div className='youtubeVideos'>
        {videos.map((video, index) => (
          <div key={index} className='videoContainer'>
            <iframe
              width='560'
              height='315'
              src={`https://www.youtube.com/embed/${video.id.videoId}`}
              title={video.snippet.title}
              frameBorder='0'
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
              allowFullScreen></iframe>
            <h3>{video.snippet.title}</h3>
          </div>
        ))}
      </div>
      <button
        className='rounded-3xl bg-[#A260A2] px-10 py-3 text-white hover:text-black'
        onClick={handleResultSave}
        disabled={isResultSaved}>
        {isResultSaved === true ? '저장 완료!' : '결과 저장'}
      </button>
      {}
    </div>
  );
};

export default SurveyResultPage;
