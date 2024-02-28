const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className='mt-4 flex justify-between'>
      {/* 이전 페이지 버튼 */}
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className='cursor-pointer rounded bg-black px-4 py-2 font-bold text-white hover:bg-main hover:text-fuchsia-800'>
        이전
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
                ? 'bg-main text-white'
                : 'bg-gray-300 text-gray-700'
            } cursor-pointer rounded px-4 py-2 font-bold hover:bg-main hover:text-fuchsia-800`}>
            {index + 1}
          </button>
        ))}
      </div>

      {/* 다음 페이지 버튼 */}
      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className='cursor-pointer rounded bg-black px-4 py-2 font-bold text-white hover:bg-main hover:text-fuchsia-800'>
        다음
      </button>
    </div>
  );
};

export default Pagination;
