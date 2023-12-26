import React, { useEffect } from 'react';
import './styles.scss';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import { login, logout, RootState } from '../../../store/userSlice';

function SideNav() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem('accessToken');
  const user = useSelector((state: RootState) => state.user.user);
  const loading = useSelector((state: RootState) => state.user.loading);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');

    if (token && process.env.REACT_APP_JWT_SECRETKEY) {
      const decodedToken = jwtDecode(token);
      console.log(decodedToken);
      dispatch(login(decodedToken));
    } else {
      dispatch(login('로그인을 해주세요!'));
    }
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='side-content'>
      <div className='sideNav'>
        <div className='side-image'>
          {user && user.name !== undefined ? (
            <div>{`${user.name} 님 반가워요.`}</div>
          ) : (
            <div>{'로그인을 해주세요!'}</div>
          )}
        </div>
        <div className='sideNav__buttons'>
          {token ? (
            <button
              onClick={() => {
                dispatch(logout());
                localStorage.clear();
                navigate('/');
                alert('다음에 또 만나요! :D');
              }}
            >
              Logout
            </button>
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
