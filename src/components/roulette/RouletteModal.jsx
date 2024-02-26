import Modal from 'react-modal';
import { motion } from 'framer-motion';
import giftImg from '../../assets/images/giftImg.png';
import { useState } from 'react';
import { useEffect } from 'react';

Modal.setAppElement('#root');

const RouletteModal = ({ isOpen, prize, closeModal, prizeImageUrl }) => {
  const [isClicked, setIsClicked] = useState(false);

  // 모달이 열리거나 닫힐 때 초기화
  useEffect(() => {
    setIsClicked(false);
  }, [isOpen]);

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
            className='w-150 mx-auto mb-4 h-auto cursor-pointer'
            whileHover={{
              scale: 1.09
            }}
            animate={{
              rotate: [-3, 3, -3],
              transition: {
                duration: 0.2,
                repeat: Infinity
              }
            }}
            onTap={() => setIsClicked(true)} // 이미지 클릭 시 동작
          />
        ) : (
          <>
            <motion.img
              src={prizeImageUrl}
              alt='SelectedGiftImg'
              className='w-300 h-quto mx-auto mb-4 rotate-0'
            />
            <p className='mb-4 text-center'>랜덤 선물: {prize}</p>
          </>
        )}

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
