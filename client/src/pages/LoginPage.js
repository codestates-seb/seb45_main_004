import Button from '../components/Button';
import OauthLoginButton from '../components/OauthLoginButton';
import EmailLoginForm from '../components/EmailLoginForm';
import api from '../api/api';
import { styled } from 'styled-components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [eamilError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isError, setIsError] = useState('');

  const navigate = useNavigate();

  //이메일 형식 검사 규칙 정의
  const isEmailValid = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  };

  const handleUserIdChange = (e) => {
    setUsername(e.target.value);

    const isValid = isEmailValid(username);

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
    setPassword(e.target.value);

    const isValid = isPasswordValid(password);

    if (!isValid) {
      setPasswordError('패스워드는 최소 8자 이상이어야 합니다.');
    } else {
      setPasswordError('');
    }
  };

  // 로그인 데이터 양식 전달 시 검사 규칙 정의
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isEmailValid(username) && isPasswordValid(password)) {
      //유효한 데이터를 서버로 전송한다.
      try {
        const responseData = await api.EmailLogin(username, password);
        navigate('/');
        return responseData;
      } catch (error) {
        console.error('비동기 요청 에러', error);
      }
    } else {
      console.log('에러: ', isError);
      setIsError('아이디와 비밀번호를 확인해주세요.');
    }
  };

  return (
    <LoginBody>
      <Logincontainer>
        <OauthLoginButton />
        <EmailLoginForm
          userId={username}
          userPassword={password}
          handleUserIdChange={handleUserIdChange}
          handleUserPasswordChange={handleUserPasswordChange}
          eamilError={eamilError}
          passwordError={passwordError}
        />
        <Button type="login" text="Log In" onClick={handleSubmit} />
      </Logincontainer>
    </LoginBody>
  );
};

export default LoginPage;
