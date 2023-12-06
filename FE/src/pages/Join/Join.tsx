import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Login/Login.modules.scss';

function Join() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [pwConfirm, setPwConfirm] = useState('');

  const [nameValid, setNameValid] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [pwValid, setPwValid] = useState(false);
  const [pwConfirmValid, setPwConfirmValid] = useState(false);
  const [notAllow, setNotAllow] = useState(true);

  const navigate = useNavigate();

  const handleName = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setName(e.target.value);

    if (inputValue.length >= 2) {
      setNameValid(true);
    } else {
      setNameValid(false);
    }
  };

  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setEmail(inputValue);
    const regex =
      /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

    if (regex.test(inputValue)) {
      setEmailValid(true);
    } else {
      setEmailValid(false);
    }
  };

  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setPw(inputValue);
    const regex =
      /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;

    if (regex.test(inputValue)) {
      setPwValid(true);
    } else {
      setPwValid(false);
    }
  };

  const handlePasswordConfirm = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setPwConfirm(inputValue);

    if (pw === inputValue) {
      setPwConfirmValid(true);
    } else {
      setPwConfirmValid(false);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (nameValid && emailValid && pwValid && pwConfirmValid) {
      navigate('/');
    } else {
      alert('회원정보를 정확히 입력해주세요.');
    }
  };

  useEffect(() => {
    if (nameValid && emailValid && pwValid && pwConfirmValid) {
      setNotAllow(false);
      return;
    }
    setNotAllow(true);
  }, [nameValid, emailValid, pwValid, pwConfirmValid]);

  return (
    <div className='page'>
      <div className='title-wrap'>Join Us!</div>

      <form action='submit' onSubmit={handleSubmit}>
        <div className='content-wrap'>
          <div className='input-title'>Name</div>

          <div className='input-wrap'>
            <input
              type='text'
              className='input'
              placeholder='이름을 입력해주세요.'
              value={name}
              onChange={handleName}
            />
          </div>

          <div className='errorMessage-wrap'>
            {!nameValid && name.length > 0 && (
              <div>이름은 2글자 이상 입력해주세요.</div>
            )}
          </div>

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
              <div>올바른 E-Mail을 입력해주세요.</div>
            )}
          </div>

          <div className='input-title'>Password</div>

          <div className='input-wrap'>
            <input
              type='password'
              className='input'
              placeholder='영문, 숫자, 특수문자 포함 10자 이상'
              value={pw}
              onChange={handlePassword}
            />
          </div>

          <div className='errorMessage-wrap'>
            {!pwValid && pw.length > 0 && (
              <div>영문, 숫자, 특수문자 포함 8자 이상 입력해주세요.</div>
            )}
          </div>

          <div className='input-title'>Password Confirm</div>

          <div className='input-wrap'>
            <input
              type='password'
              className='input'
              placeholder='비밀번호를 확인해주세요.'
              value={pwConfirm}
              onChange={handlePasswordConfirm}
            />
          </div>

          <div className='errorMessage-wrap'>
            {!pwConfirmValid && pwConfirm.length > 0 && (
              <div>비밀번호를 확인해주세요.</div>
            )}
          </div>
        </div>

        <div>
          <button
            style={{ marginTop: '30px' }}
            disabled={notAllow}
            id='joinButton'
            className='bottomButtons'
          >
            Join
          </button>
        </div>
      </form>
    </div>
  );
}

export default Join;
