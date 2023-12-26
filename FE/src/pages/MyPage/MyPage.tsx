import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import SideNav from '../../components/Common/Side';
import './MyPage.modules.scss';

function MyPage() {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [pw, setPw] = useState<string>('');
  const [pwConfirm, setPwConfirm] = useState<string>('');

  const [nameValid, setNameValid] = useState<boolean>(false);
  const [emailValid, setEmailValid] = useState<boolean>(false);
  const [pwValid, setPwValid] = useState<boolean>(false);
  const [pwConfirmValid, setPwConfirmValid] = useState<boolean>(false);
  const [notAllow, setNotAllow] = useState<boolean>(true);

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
      alert('회원정보가 수정되었습니다.');
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
    <div className='myPage-wrap'>
      <SideNav />
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
              placeholder='E-mail을 입력해주세요.'
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
              placeholder='********'
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
              placeholder='********'
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
            id='modifyButton'
            className='bottomButtons'
          >
            정보 수정
          </button>
        </div>
      </form>
    </div>
  );
}

export default MyPage;
