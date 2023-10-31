import React from 'react';
import './styles.scss';
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();

  return (
    <div>
      <nav className='header'>
        <div className='header__navs'>
          <span className='header__nav' onClick={() => navigate('/')}>
            Home
          </span>
          <span className='header__nav' onClick={() => navigate('/diary')}>
            Calendar
          </span>
          <span className='header__nav' onClick={() => navigate('/login')}>
            My Page
          </span>
          <div className='header__nav'>
            <span>회원정보</span>
            <span className='header__nav'>날씨</span>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
