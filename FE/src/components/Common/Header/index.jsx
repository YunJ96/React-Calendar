import React, { useState, useEffect } from 'react';
import './styles.scss';
import { useNavigate } from 'react-router-dom';
import weatherApi from '../../../api/weather.js';

function Header() {
  const navigate = useNavigate();
  const [temp, setTemp] = useState(null);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const callWeatherApi = async () => {
      try {
        const response = await weatherApi();
        setTemp(response[0]);
        setWeather(response[1]);
      } catch (error) {
        console.log(error);
      }
    };
    callWeatherApi();
  }, []);

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
                <span>{temp}°C</span>
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
