import React from 'react';
import './styles.scss';
import { useNavigate } from 'react-router-dom';

function SideNav() {
  const navigate = useNavigate();

  return (
    <div className='side-content'>
      <div className='sideNav'>
        <div className='side-image'>image</div>
        <div className='sideNav__buttons'>
          <button onClick={() => navigate('/login')}>Login</button>
          <button>Join</button>
        </div>
      </div>
      <div className='sideMenu'>Menu</div>
    </div>
  );
}

export default SideNav;
