import React from 'react';
import './Home.modules.scss';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  return (
    <div className='main'>
      <span>당신의 할 일, 저희가 도와드릴게요.</span>{' '}
      <span>일상의 작은 목표부터 큰 계획까지.</span>{' '}
      <span>나만의 투두리스트로 일상을 더 효율적으로 관리하세요.</span>{' '}
      <button onClick={() => navigate('/diary')}>시작하기</button>
    </div>
  );
}

export default Home;
