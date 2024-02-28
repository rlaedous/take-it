const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className='mt-4 flex items-center justify-center'>
      {/* 이전 페이지 버튼 */}
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className={`rounded-full p-2 ${currentPage === 1 ? 'cursor-not-allowed text-gray-400' : 'cursor-pointer text-black hover:text-black'}`}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-6 w-6'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'>
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M15 19l-7-7 7-7'
          />
        </svg>
      </button>

      {/* 페이지 번호 버튼들 */}
      <div className='flex'>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => onPageChange(index + 1)}
            disabled={currentPage === index + 1}
            className={`mx-1 ${
              currentPage === index + 1
                ? 'cursor-not-allowed bg-main text-black hover:bg-main'
                : 'cursor-pointer text-gray-700 hover:bg-gray-200'
            } rounded-full px-4 py-2 font-bold transition-colors duration-300`}>
            {index + 1}
          </button>
        ))}
      </div>

      {/* 다음 페이지 버튼 */}
      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className={`rounded-full p-2 ${currentPage === totalPages ? 'cursor-not-allowed text-gray-400' : 'cursor-pointer text-black hover:text-black'}`}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-6 w-6'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'>
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M9 5l7 7-7 7'
          />
        </svg>
      </button>
    </div>
  );
};

export default Pagination;
