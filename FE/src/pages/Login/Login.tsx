import React, { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.modules.scss';
import userApi from '../../api/userApi';

function Login() {
  const [email, setEmail] = useState<string>('');
  const [pw, setPw] = useState<string>('');

  const [emailValid, setEmailValid] = useState<boolean>(false);
  const [pwValid, setPwValid] = useState<boolean>(false);
  const [notAllow, setNotAllow] = useState<boolean>(true);

  const navigate = useNavigate();

  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setEmail(inputValue);
    const regex =
      /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

    setEmailValid(regex.test(inputValue));
  };

  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setPw(inputValue);
    const regex =
      /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;

    setPwValid(regex.test(inputValue));
  };

  const handleLoginButton = async () => {
    try {
      const response = await userApi.login(email, pw);
      console.log(response);
      navigate('/');
    } catch (error) {
      console.error(error);
      alert('로그인에 실패했습니다. 잠시 후 다시 시도해주시기 바랍니다.');
    }
  };

  useEffect(() => {
    if (emailValid && pwValid) {
      setNotAllow(false);
    } else {
      setNotAllow(true);
    }
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
          onClick={handleLoginButton}
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
