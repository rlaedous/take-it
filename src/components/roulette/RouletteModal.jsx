import Modal from 'react-modal';
import { motion } from 'framer-motion';
import giftImg from '../../assets/images/giftImg.png';
import { useState } from 'react';
import { useEffect } from 'react';

Modal.setAppElement('#root');

const RouletteModal = ({ isOpen, prize, closeModal }) => {
  const [isClicked, setIsClicked] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  // 모달이 열리거나 닫힐 때 초기화
  useEffect(() => {
    setIsClicked(false);
    setImageUrl('');
  }, [isOpen]);

  // 이미지 클릭 시 동작
  const handleClick = () => {
    setIsClicked(true);
    // 지정한 URL에서 이미지 가져오기
    setImageUrl(
      // 임의 URL 넣어놓음
      'https://tounou.co.kr/web/product/big/202301/00e462813f6e3af6990132c0ddb60e4a.jpg'
    );
  };
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      className='modal fixed inset-0 flex items-center justify-center'
      overlayClassName='fixed inset-0 bg-black bg-opacity-70'
      style={{
        content: {
          zIndex: 1000 // 모달이 룰렛 위에 올라가도록 설정
        },
        overlay: {
          zIndex: 999
        }
      }}>
      <div className='w-96 rounded-md bg-white p-8'>
        <h2 className='mb-4 text-center text-2xl font-bold'>
          Congratulations!
        </h2>
        {!isClicked ? (
          <motion.img
            src={giftImg}
            alt='GiftImg'
            className='mx-auto mb-4'
            style={{ width: '170px', height: 'auto' }}
            whileHover={{
              scale: 1.1
            }}
            animate={{
              rotate: [-3, 3, -3],
              transition: {
                duration: 0.2,
                repeat: Infinity
              }
            }}
            onTap={handleClick} // 이미지 클릭 시 동작
          />
        ) : (
          // URL에서 가져온 이미지 표시
          <motion.img
            src={imageUrl}
            alt='SelectedGiftImg'
            className='mx-auto mb-4'
            style={{ width: '300px', height: 'auto', rotate: 0 }}
            initial={{ opacity: 0 }} // 초기 투명도 설정
            animate={{ opacity: 2 }} // 나타나는 애니메이션
          />
        )}
        <p className='mb-4 text-center'>랜덤 선물: {prize}</p>
        <button
          className='mx-auto block rounded-md bg-gray-800 px-4 py-2 text-white'
          onClick={closeModal}>
          Close
        </button>
      </div>
    </Modal>
  );
};

export default RouletteModal;
