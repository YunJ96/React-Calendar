import React from 'react';
import './styles.scss';
import { useNavigate } from 'react-router-dom';
import userApi from '../../../api/userApi';

function SideNav() {
  const navigate = useNavigate();
  const token = localStorage.getItem('accessToken');

  const handleLogoutButton = async () => {
    try {
      const response = await userApi.logout();
      console.log(response);
      navigate('/');
    } catch (error) {
      console.error(error);
      alert('로그아웃에 실패했습니다. 다시 시도해주시기 바랍니다.');
    }
  };

  return (
    <div className='side-content'>
      <div className='sideNav'>
        <div className='side-image'>image</div>
        <div className='sideNav__buttons'>
          {token ? (
            <button onClick={handleLogoutButton}>Logout</button>
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
