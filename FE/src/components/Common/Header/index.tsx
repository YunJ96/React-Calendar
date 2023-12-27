import React, { useState, useEffect } from 'react';
import './styles.scss';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import { login, RootState } from '../../../store/userSlice';
import weatherApi from '../../../api/weather';

function Header() {
  const navigate = useNavigate();
  const [temp, setTemp] = useState<number | null>(null);
  const [weather, setWeather] = useState<string | null>(null);

  useEffect(() => {
    const callWeatherApi = async () => {
      try {
        const response = await weatherApi();
        setTemp(response[0]);
        setWeather(response[1]);
      } catch (error) {
        console.error(error);
      }
    };
    callWeatherApi();
  }, []);

  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user);

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

  const tempStyle = {
    color: temp !== null ? (temp >= 0 ? 'red' : 'blue') : 'black',
  };

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
          <span className='header__nav' onClick={() => navigate('/myPage')}>
            My Page
          </span>
          <div className='header__nav'>
            {
              <div>
                <span>
                  {user && user.name !== undefined ? (
                    <span>{`${user.name} 님`}</span>
                  ) : (
                    <span>{''}</span>
                  )}
                </span>
                <span style={tempStyle}>{temp}°C</span>
                <span>{weather}</span>
              </div>
            }
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
