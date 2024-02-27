import gifts from '../../../public/gifts.json';

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
              <button
                onClick={() => setIsModalOpen(false)}
                className='rounded bg-blue-500 px-4 py-2 text-white'>
                닫기
              </button>
            </div>
            <div className='flex gap-6'>
              <img
                src={gift.imageUrl}
                alt='이미지'
                className='mb-4 max-h-full max-w-96 rounded'
              />
              <input
                className='h-12 w-80 border-gray-300 px-2'
                placeholder='댓글 입력'></input>
              <button className='h-12 rounded bg-green-500 px-4 py-2 text-white'>
                등록
              </button>
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
