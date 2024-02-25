import { Wheel } from 'react-custom-roulette';
import { useState } from 'react';
import JSConfetti from 'js-confetti';
import RouletteModal from '../components/roulette/RouletteModal';
import heart from '../assets/images/heart.png';

const RoulettePage = () => {
  //룰렛 데이터.. 나온 선물들 받아와서 랜덤 10?개 정도?
  const data = [{ option: '0' }, { option: '1' }, { option: '2' }];

  const [mustSpin, setMustSpin] = useState(false); //룰렛회전
  const [prizeNumber, setPrizeNumber] = useState(0); //회전멈추면 선택항목 저장
  const jsConfetti = new JSConfetti();
  const [isOpen, setIsOpen] = useState(false);
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
  const handleSpinClick = () => {
    if (!mustSpin) {
      const newPrizeNumber = Math.floor(Math.random() * data.length);
      setPrizeNumber(newPrizeNumber);
      setMustSpin(true);
    }
  };
  const closeModal = () => {
    setIsOpen(false); // 모달 닫기
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
    <div className='flex h-screen items-center justify-center'>
      <div className='flex flex-col items-center'>
        <Wheel
          spinDuration={0.2}
          mustStartSpinning={mustSpin}
          prizeNumber={prizeNumber}
          data={data}
          onStopSpinning={() => {
            setMustSpin(false);
            handleConfetti();
            setIsOpen(true);
            //alert(data[prizeNumber].option + '이 당첨되셨습니다');
          }}
          backgroundColors={['#FAF7FA', '#F2CBF2', '#DDA0DD']}
          outerBorderColor='#020000'
          outerBorderWidth={16}
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
        prize={data[prizeNumber].option}
        closeModal={closeModal}
      />
    </div>
  );
};

export default RoulettePage;
