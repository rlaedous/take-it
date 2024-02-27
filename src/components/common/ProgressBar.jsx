const ProgressBar = ({ progress }) => {
  return (
    <div className='h-5 w-full overflow-hidden rounded-full bg-gray-200'>
      <div
        className='h-full rounded-full bg-main transition-all'
        style={{ width: `${progress}%` }}></div>
    </div>
  );
};

export default ProgressBar;
