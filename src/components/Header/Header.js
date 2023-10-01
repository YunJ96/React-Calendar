import React from 'react';
import './Header.scss';

function Header() {
  return (
    <div>
      <nav className='header'>
        <div className='header__navs'>
          <span className='header__nav'>Home</span>
          <span className='header__nav'>Calendar</span>
          <span className='header__nav'>Diary</span>
        </div>
      </nav>
    </div>
  );
}

export default Header;
