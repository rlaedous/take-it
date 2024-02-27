import { Wheel } from 'react-custom-roulette';
import { useState } from 'react';
import JSConfetti from 'js-confetti';
import RouletteModal from '../components/roulette/RouletteModal';
import heart from '../assets/images/heart.png';
import gifts from '/public/gifts.json';
import { useMemo } from 'react';

const RoulettePage = () => {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const jsConfetti = new JSConfetti();
  const [isOpen, setIsOpen] = useState(false);

  const handleConfetti = () => {
    jsConfetti.addConfetti({
      confettiColors: ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF'],
      zIndex: 1000,
      confettiRadius: 6.5,
      confettiNumber: 600
    });
  };

  const selectRandomGifts = () => {
    const allGifts = gifts;
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

  const data = useMemo(() => {
    const randomGifts = selectRandomGifts();
    return randomGifts.map((gift) => ({
      option: gift.name,
      name: gift.name,
      imageUrl: gift.imageUrl
    }));
  }, []);

  const handleSpinClick = () => {
    if (!mustSpin) {
      const newPrizeNumber = Math.floor(Math.random() * data.length);
      setPrizeNumber(newPrizeNumber);
      setMustSpin(true);
    }
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  const pointerProps = {
    src: heart,
    width: '50px',
    height: '50px',
    style: {
      transform: 'translate(-70%, -50%) rotate(390deg)'
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
            setIsOpen(true);
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
        prize={data[prizeNumber].option}
        closeModal={closeModal}
        prizeImageUrl={data[prizeNumber].imageUrl}
      />
    </div>
  );
};

export default RoulettePage;
