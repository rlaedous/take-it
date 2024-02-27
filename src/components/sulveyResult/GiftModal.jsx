import gifts from '../../../public/gifts.json';
import { IoClose } from 'react-icons/io5';

const GiftModal = ({ isModalOpen, setIsModalOpen, selectedGift }) => {
  const gift = gifts.find((item) => item.id === selectedGift);

  return (
    <>
      {isModalOpen ? (
        <div className='fixed left-0 top-0 flex h-full w-full items-center justify-center'>
          <div className='absolute h-full w-full bg-black opacity-50'></div>

          <div className='z-10 flex flex-col items-center rounded-lg bg-white p-6'>
            <div className='mb-4 flex w-full justify-between'>
              <p className='mb-4 text-lg font-bold'>{gift.name}</p>
              <IoClose
                className=' cursor-pointer'
                color='#333'
                size='30px'
                onClick={() => setIsModalOpen(false)}
              />
            </div>
            <div className='flex gap-6'>
              <img
                src={gift.imageUrl}
                alt='이미지'
                className='mb-4 max-h-full max-w-96 rounded'
              />
              <div className='bg-red w-full border-t-2 border-black'>
                <div className='mb-7 ml-1 flex h-80 border-b-2 border-black'>
                  <label>aa</label>
                </div>
                <input
                  className='h-12 w-80 border-gray-300 px-2'
                  placeholder='댓글 입력'></input>
                <button className='h-12 rounded bg-main px-4 py-2 text-white'>
                  등록
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <> </>
      )}
    </>
  );
};

export default GiftModal;
