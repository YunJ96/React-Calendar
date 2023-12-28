import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useDispatch, useSelector } from 'react-redux';
import SideNav from '../../components/Common/Side';
import './MyPage.modules.scss';
import userApi from '../../api/userApi';
import { RootState, login } from '../../store/userSlice';

interface JwtPayload {
  name: string;
  email: string;
}

interface DecodedToken {
  name: string;
  email: string;
}

function MyPage() {
  const dispatch = useDispatch();
  const token = localStorage.getItem('accessToken');
  let decodedToken: DecodedToken | undefined;

  if (!token) {
    console.error('토큰이 없습니다.');
  } else {
    try {
      decodedToken = jwtDecode<JwtPayload>(token);
    } catch (error) {
      console.error('토큰 해독 오류:', error);
    }
  }

  const [name, setName] = useState<string>('');
  const [pw, setPw] = useState<string>('');
  const [pwConfirm, setPwConfirm] = useState<string>('');

  const [nameValid, setNameValid] = useState<boolean>(true);
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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (nameValid && pwValid && pwConfirmValid && name && decodedToken) {
      try {
        const response = await userApi.update(name, decodedToken.email, pw);

        dispatch(login(response?.data.updateUser.name));

        alert('회원정보가 수정되었습니다.');
        window.location.reload();
      } catch (error) {
        console.error(error);
        alert('회원정보를 업데이트하는 중 오류가 발생했습니다.');
      }
    } else {
      alert('회원정보를 정확히 입력해주세요.');
    }
  };

  useEffect(() => {
    if (nameValid && pwValid && pwConfirmValid) {
      setNotAllow(false);
      return;
    }
    setNotAllow(true);
  }, [nameValid, pwValid, pwConfirmValid]);

  return (
    <div className='myPage-wrap'>
      <SideNav />
      <form action='submit' onSubmit={handleSubmit}>
        <div className='content-wrap'>
          <div className='input-title'>E-mail</div>

          <div className='input-wrap'>
            <input
              type='text'
              className='input'
              value={decodedToken?.email}
              readOnly={true}
            />
          </div>

          <div className='input-title'>Name</div>

          <div className='input-wrap'>
            <input
              type='text'
              className='input'
              placeholder={'이름을 입력해주세요.'}
              onChange={handleName}
            />
          </div>

          <div className='errorMessage-wrap'>
            {!nameValid && name && name.length < 2 && (
              <div>이름은 2글자 이상 입력해주세요.</div>
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
