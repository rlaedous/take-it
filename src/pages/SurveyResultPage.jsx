import { useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';

const SurveyResultPage = () => {
  const [videos, setVideos] = useState([]);
  const selectedGifts = useSelector((state) => state.surveyResult.gifts);
  const results = useSelector((state) => state.surveyResult.surveyResult);
  console.log('surveyResult', results);

  const [hasAccessToken, setHasAccessToken] = useState(false); // accessToken이 있는지 여부를 추적하는 상태값 추가
  const at = localStorage.getItem('accessToken');
  const { data } = useQuery({
    queryKey: ['loginStatus']
  });
  console.log(data);
  const navigate = useNavigate();
  const [isResultSaved, setIsResultSaved] = useState(false);

  useEffect(() => {
    if (results && results.gender) {
      const gender = results.gender === 'F' ? '여자' : '남자';
      const age = results.age.replace('s', '대');
      const searchId = encodeURIComponent(`${gender}, ${age} 선물 추천`);
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
  }, []);

  useEffect(() => {
    if (selectedGifts === null) {
      navigate('/survey'); // 선택된 선물이 없으면 /survey 페이지로 이동
    }
  }, [selectedGifts, navigate]);
  useEffect(() => {
    // data가 존재하면 accessToken이 있으므로 hasAccessToken을 true로 설정
    if (at) {
      setHasAccessToken(true);
    } else {
      setHasAccessToken(false);
    }
  }, [at]);
  const handleResultSave = async () => {
    try {
      if (!isResultSaved) {
        const currentTime = new Date();
        const response = await axios.post(
          'https://tungsten-flossy-van.glitch.me/surveyResults',
          {
            gifts: selectedGifts,
            surveyResult: results,
            userId: data.user.id,
            createdAt: currentTime.toISOString()
          }
        );
        setIsResultSaved(true); // 결과 저장 후 상태 업데이트
        return response.data;
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className='mx-auto max-w-main text-center'>
      <h3 className='my-3 mt-7 text-center text-2xl font-bold'>
        너가 줄 선물은
      </h3>
      <div className='surveyResultBox mt-5 flex justify-center gap-4'>
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
          <div>마땅한게 없네..</div>
        )}
      </div>
      {selectedGifts && (
        <div className='mx-auto my-8  w-1/2 font-bold'>
          {`#${results.gender === 'F' ? '여자' : '남자'} 
 #${results.age.replace('s', '대')}
 #${results.whom}선물
 #${results.isT === 'false' ? '실용적' : '감성적'}
 `}
        </div>
      )}
      {hasAccessToken && (
        <button
          className='cursor-pointer rounded-3xl bg-[#A260A2] px-10 py-3 text-white hover:text-black'
          onClick={handleResultSave}
          disabled={isResultSaved}>
          {isResultSaved === true ? '저장 완료!' : '결과 저장'}
        </button>
      )}
      {/*비디오 부분*/}
      <div className='mb-4 mt-4 text-left text-xl font-bold'>
        <h2 className=' mb-2 text-xl font-bold'>관련 유튜브 영상</h2>
        <hr className='my-2 border-gray-300' />
        <div className='youtubeVideos mt-3 flex overflow-x-auto'>
          {videos.map((video, index) => (
            <div key={index} className='videoContainer  mr-4 flex-shrink-0'>
              <iframe
                width='500'
                height='300'
                src={`https://www.youtube.com/embed/${video.id.videoId}`}
                frameBorder='0'
                allowFullScreen></iframe>
              <h3 className='mt-2 h-16 max-w-[500px] overflow-hidden text-lg font-medium'>
                {video.snippet.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SurveyResultPage;
