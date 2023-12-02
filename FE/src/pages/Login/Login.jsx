import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.modules.scss';

const User = {
  email: 'test@gmail.com',
  pw: 'test123!!!',
};

function Login() {
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');

  const [emailValid, setEmailValid] = useState(false);
  const [pwValid, setPwValid] = useState(false);
  const [notAllow, setNotAllow] = useState(true);

  const navigate = useNavigate();

  const handleEmail = (e) => {
    setEmail(e.target.value);
    const regex =
      /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

    if (regex.test(email)) {
      setEmailValid(true);
    } else {
      setEmailValid(false);
    }
  };

  const handlePassword = (e) => {
    setPw(e.target.value);
    const regex =
      /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;

    if (regex.test(pw)) {
      setPwValid(true);
    } else {
      setPwValid(false);
    }
  };

  const onClickConfirmButton = () => {
    if (email === User.email && pw === User.pw) {
      alert('로그인에 성공하였습니다.');
    } else {
      alert('등록되지 않은 회원입니다.');
    }
  };

  useEffect(() => {
    if (emailValid && pwValid) {
      setNotAllow(false);
      return;
    }
    setNotAllow(true);
  }, [emailValid, pwValid]);

  return (
    <div className='page'>
      <div className='title-wrap'>Welcome!</div>

      <div className='content-wrap'>
        <div className='input-title'>E-mail</div>

        <div className='input-wrap'>
          <input
            type='text'
            className='input'
            placeholder='test@gmail.com'
            value={email}
            onChange={handleEmail}
          />
        </div>

        <div className='errorMessage-wrap'>
          {!emailValid && email.length > 0 && (
            <div>올바른 아이디를 입력해주세요.</div>
          )}
        </div>

        <div style={{ marginTop: '26px' }} className='inputTitle'>
          Password
        </div>

        <div className='input-wrap'>
          <input
            type='password'
            className='input'
            placeholder='영문, 숫자, 특수문자 포함 8자 이상'
            value={pw}
            onChange={handlePassword}
          />
        </div>

        <div className='errorMessage-wrap'>
          {!pwValid && pw.length > 0 && (
            <div>영문, 숫자, 특수문자 포함 8자 이상 입력해주세요.</div>
          )}
        </div>
      </div>

      <div>
        <button
          onClick={onClickConfirmButton}
          disabled={notAllow}
          id='loginButton'
          className='bottomButtons'
        >
          Login
        </button>
        <button
          onClick={() => navigate('/join')}
          id='joinButton'
          className='bottomButtons'
        >
          Join
        </button>
      </div>
    </div>
  );
}

export default Login;
