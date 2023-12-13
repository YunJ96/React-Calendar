import React from 'react';
import './styles.scss';
import { useNavigate } from 'react-router-dom';

function SideNav() {
  const navigate = useNavigate();
  const token = localStorage.getItem('accessToken');

  return (
    <div className='side-content'>
      <div className='sideNav'>
        <div className='side-image'>image</div>
        <div className='sideNav__buttons'>
          {token ? (
            <button onClick={() => navigate('/')}>Logout</button>
          ) : (
            <>
              <button onClick={() => navigate('/login')}>Login</button>
              <button onClick={() => navigate('/join')}>Join</button>
            </>
          )}
        </div>
      </div>
      <div className='sideMenu'>Menu</div>
    </div>
  );
}

export default SideNav;
