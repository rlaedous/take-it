import { Wheel } from 'react-custom-roulette';
import { useState } from 'react';
import JSConfetti from 'js-confetti';
import RouletteModal from '../components/roulette/RouletteModal';
import heart from '../assets/images/heart.png';
import gifts from '/public/gifts.json';

const RoulettePage = () => {
  const [mustSpin, setMustSpin] = useState(false); //룰렛회전
  const [prizeNumber, setPrizeNumber] = useState(0); //회전멈추면 선택항목 저장
  const [prize, setPrize] = useState(''); // 모달에 전달할 prize 업데이트
  const [imgUrl, setImgUrl] = useState(); // 모달에 전달할 prize 업데이트
  const jsConfetti = new JSConfetti();
  const [isOpen, setIsOpen] = useState(false);
  /*뽑은 선물 저장하려고만든 state
  const [selectedGifts, setSelectedGifts] = useState([]);
*/
  const handleConfetti = () => {
    jsConfetti.addConfetti({
      confettiColors: [
        '#FF0000', // 빨간색
        '#00FF00', // 초록색
        '#0000FF', // 파란색
        '#FFFF00', // 노란색
        '#FF00FF' // 분홍색
      ],
      zIndex: 1000, // 다른 요소 위에 표시되도록 zIndex 설정
      confettiRadius: 6.5,
      confettiNumber: 600
    });
  };

  // 랜덤으로 10개의 선물 이름 선택
  const selectRandomGifts = () => {
    const allGifts = gifts; // 선물 데이터 그 자체를 사용합니다.
    const selected = [];
    while (selected.length < 10) {
      const randomIndex = Math.floor(Math.random() * allGifts.length);
      const randomGift = allGifts[randomIndex];
      if (!selected.includes(randomGift)) {
        selected.push(randomGift);
      }
    }
    return selected;
  };

  const generateRouletteData = () => {
    const randomGifts = selectRandomGifts();
    return randomGifts.map((gift) => ({
      option: gift.name, // 선물의 이름을 옵션으로 설정합니다.
      name: gift.name,
      imageUrl: gift.imageUrl // 선물의 이미지 URL을 설정합니다.
    }));
  };
  const data = generateRouletteData(); //wheel안의 데이터에 랜덤선물설정

  const handleSpinClick = () => {
    if (!mustSpin) {
      const newPrizeNumber = Math.floor(Math.random() * data.length); //당첨번호
      setPrizeNumber(newPrizeNumber);
      setMustSpin(true);
    }
  };
  const closeModal = () => {
    setIsOpen(false); // 모달 닫기
    /* 선택된 선물을 저장하는 함수 (일단 안함)
    setSelectedGifts((prevSelectedGifts) => [
      ...prevSelectedGifts,
      data[prizeNumber].option
    ]);*/
  };

  const pointerProps = {
    src: heart, // 포인터 이미지 소스
    width: '50px', // 포인터 이미지 너비
    height: '50px', // 포인터 이미지 높이
    style: {
      // 포인터 이미지의 CSS 스타일
      transform: 'translate(-70%, -50%) rotate(390deg)' // 예시로 회전 및 위치 이동
    }
  };

  return (
    <div className='mt-20 flex items-center justify-center'>
      <div className='flex flex-col items-center'>
        <Wheel
          fontSize={18}
          spinDuration={0.2}
          mustStartSpinning={mustSpin}
          prizeNumber={prizeNumber}
          data={data}
          onStopSpinning={() => {
            setMustSpin(false);
            handleConfetti();
            setPrize(data[prizeNumber].option);
            setImgUrl(data[prizeNumber].imageUrl);
            setIsOpen(true);
            //alert(data[prizeNumber].option + '이 당첨되셨습니다');
          }}
          backgroundColors={['#FAF7FA', '#F2CBF2', '#DDA0DD']}
          outerBorderColor='#020000'
          outerBorderWidth={10}
          innerBorderColor='#020000'
          innerBorderWidth={8}
          radiusLineColor='#020000'
          radiusLineWidth={6}
          pointerProps={pointerProps}
        />
        <button
          onClick={handleSpinClick}
          className='mt-12 transform-gpu rounded-full bg-gradient-to-r from-pink-500 to-purple-500 px-8 py-4 font-bold text-white transition-transform hover:-translate-y-1 hover:shadow-lg'>
          룰렛 돌리기
        </button>
      </div>
      <RouletteModal
        isOpen={isOpen}
        prize={prize}
        closeModal={closeModal}
        prizeImageUrl={imgUrl}
      />
    </div>
  );
};

export default RoulettePage;
