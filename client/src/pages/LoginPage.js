import Button from '../components/Button';
import OauthLoginButton from '../components/OauthLoginButton';
import EmailLoginForm from '../components/EmailLoginForm';
import api from '../api/api';
import { styled } from 'styled-components';
import { useState } from 'react';

const LoginBody = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
`;

const Logincontainer = styled.div`
  width: 430px;
  margin-top: 100px;
  margin-bottom: 100px;
`;

const LoginPage = () => {
  const [userId, setUserId] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [eamilError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  //이메일 형식 검사 규칙 정의
  const isEmailValid = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  };

  const handleUserIdChange = (e) => {
    setUserId(e.target.value);

    const isValid = isEmailValid(userId);

    if (!isValid) {
      setEmailError('유효한 메일 형식이 아닙니다.');
    } else {
      setEmailError('');
    }
  };
  //패스워드 유효성 검사 규칙 정의
  const isPasswordValid = (password) => {
    return password.length >= 8;
  };

  const handleUserPasswordChange = (e) => {
    setUserPassword(e.target.value);

    const isValid = isPasswordValid(userPassword);

    if (!isValid) {
      setPasswordError('패스워드는 최소 8자 이상이어야 합니다.');
    } else {
      setPasswordError('');
    }
  };

  // 로그인 데이터 양식 전달 시 검사 규칙 정의
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isEmailValid(userId) && isPasswordValid(userPassword)) {
      //유효한 데이터를 서버로 전송한다.
      try {
        const responseData = await api.EmailLogin(userId, userPassword);
        console.log('서버 응답 데이터', responseData);
      } catch (error) {
        console.error('비동기 요청 에러', error);
      }
    } else {
      setEmailError('유효한 이메일을 입력하세요.');
      setPasswordError('유효한 비밀번호를 입력하세요.');
    }
  };

  return (
    <LoginBody>
      <Logincontainer>
        <OauthLoginButton />
        <EmailLoginForm
          userId={userId}
          userPassword={userPassword}
          handleUserIdChange={handleUserIdChange}
          handleUserPasswordChange={handleUserPasswordChange}
          eamilError={eamilError}
          passwordError={passwordError}
        />
        <Button type="login" text="Log In" onSubmit={handleSubmit} />
      </Logincontainer>
    </LoginBody>
  );
};

export default LoginPage;
