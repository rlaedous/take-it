import { IoClose } from 'react-icons/io5';

const CustomModal = ({ isOpen, closeModal, children }) => {
  return (
    <div
      className={`fixed left-0 top-0 h-full w-full bg-black bg-opacity-35 ${isOpen ? 'block' : 'hidden'}`}>
      <div className='max-h-90vh absolute left-1/2 top-1/2 w-full max-w-screen-sm -translate-x-1/2 -translate-y-1/2 transform cursor-pointer overflow-y-auto rounded-lg border border-gray-300 bg-white p-8 text-center'>
        <IoClose
          className='absolute right-4 top-4 cursor-pointer'
          color='#333'
          size='30px'
          onClick={closeModal}
        />
        {children}
      </div>
    </div>
  );
};

export default CustomModal;
