import Modal from 'react-modal';
import giftImg from '../../assets/giftImg.png';
Modal.setAppElement('#root');

const RouletteModal = ({ isOpen, prize, closeModal }) => {
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
      <div className='bg-white p-8 rounded-md w-96'>
        <h2 className='text-center text-2xl font-bold mb-4'>
          Congratulations!
        </h2>
        <img
          src={giftImg}
          alt='GiftImg'
          className='mx-auto mb-4'
          style={{ width: '170px', height: 'auto' }}
        />
        <p className='text-center mb-4'>랜덤 선물: {prize}</p>
        <button
          className='block mx-auto px-4 py-2 bg-gray-800 text-white rounded-md'
          onClick={closeModal}>
          Close
        </button>
      </div>
    </Modal>
  );
};

export default RouletteModal;
