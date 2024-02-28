import notion from '../../assets/images/notion.png';

const Footer = () => {
  const handleClick = () => {
    // 노션 주소로 이동합니다.
    window.open(
      'https://teamsparta.notion.site/782eec878742460fbc2937f122f25478',
      '_blank'
    );
  };

  return (
    <div className='flex min-h-[70px] items-center justify-center bg-main'>
      <div onClick={handleClick} className='flex items-center'>
        <img src={notion} alt='notion' className='w-[50px] cursor-pointer' />
        <span className='ml-2'>7조:말 걸면 진짜 울어요</span>
      </div>
    </div>
  );
};

export default Footer;
