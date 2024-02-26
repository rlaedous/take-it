import { Link, useNavigate } from 'react-router-dom';
import arrow from '../../assets/images/arrow.png';
import logo from '../../assets/images/takeit_logo.png';
import { useEffect, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef(null);

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);
  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      handleMenuOnblur();
    }
  };
  const handleInfoClick = () => {
    setIsOpen(!isOpen);
  };
  const handleMypageClick = () => {
    navigate('/mypage');
    setIsOpen(!isOpen);
  };
  const handleLogout = () => {};
  const handleMenuOnblur = () => {
    setTimeout(() => {
      setIsOpen(false);
    }, 200);
  };
  const { data } = useQuery({
    queryKey: ['loginStatus']
  });
  return (
    <div className='flex h-[70px] items-center justify-between bg-main px-4'>
      <div className='w-[200px]'>
        <img src={logo} alt='로고' className='cursor-pointer' />
      </div>
      <div>
        {data ? (
          <>
            <div
              ref={menuRef}
              className={`${isOpen ? 'bg-white' : ''} relative flex w-[200px] justify-around rounded-t-md py-2`}>
              <span className='text-xl font-bold'>{data.user.nickname}</span>
              {isOpen && (
                <div className='absolute top-11 w-[100%] rounded-b-md bg-white shadow-md'>
                  <div>
                    <p
                      className='cursor-pointer px-6 py-3 hover:bg-slate-600 hover:text-white'
                      onClick={handleMypageClick}>
                      내정보
                    </p>
                    <p
                      className='cursor-pointer px-6 py-3 hover:rounded-b-md hover:bg-slate-600 hover:text-white'
                      onClick={handleLogout}>
                      로그아웃
                    </p>
                  </div>
                </div>
              )}
              <img
                src={arrow}
                onClick={handleInfoClick}
                className='w-[20px] cursor-pointer'
              />
            </div>
          </>
        ) : (
          <div>
            <Link to='/login' className='font-bold'>
              로그인/회원가입
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
