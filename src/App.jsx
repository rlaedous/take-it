function App() {
  return (
    <>
      <div>
        <h1 className='text-3xl font-bold underline'>Hello world!</h1>
        <div className='flex justify-between w-48 mt-5 text-xs text-gray-400'>
          <button
            type='button'
            className="relative after:absolute after:content-[''] after:w-px after:h-2.5 after:top-1 after:left-32 after:bg-gray-300">
            아이디/비밀번호 찾기
          </button>
          <button type='button'>회원가입</button>
        </div>
        <div>
          <button className='relative h-[50px] w-40 overflow-hidden border border-pink-400 bg-white text-pink-400 shadow-2xl transition-all before:absolute before:left-0 before:top-0 before:h-full before:w-0 before:duration-500 after:absolute after:right-0 after:top-0 after:h-full after:w-0 after:duration-500 hover:text-white hover:shadow-pink-400 hover:before:w-2/4 hover:before:bg-pink-400 hover:after:w-2/4 hover:after:bg-pink-400'>
            <span className='relative z-10'>Submit</span>
          </button>
        </div>
        <button className='relative flex h-[50px] w-40 items-center justify-center overflow-hidden bg-blue-600 font-medium text-white shadow-2xl transition-all duration-300 before:absolute before:inset-0 before:border-0 before:border-white before:duration-100 before:ease-linear hover:bg-white hover:text-blue-600 hover:shadow-blue-600 hover:before:border-[25px]'>
          <span className='relative z-10'>Hide Background</span>
        </button>
      </div>
    </>
  );
}

export default App;
