import Button from '../components/Button';
import OauthLoginButton from '../components/OauthLoginButton';
import EmailLoginForm from '../components/EmailLoginForm';
import { styled } from 'styled-components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { fetchMyData, login } from '../redux/actions';

const LoginBody = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  height: 100%;
`;

const Logincontainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [eamilError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isError, setIsError] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();
  //이메일 형식 검사 규칙 정의
  const isEmailValid = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);

    const isValid = isEmailValid(e.target.value);

    if (!isValid) {
      setEmailError('유효한 메일 형식이 아닙니다.');
    } else {
      setEmailError('');
    }
  };
  //패스워드 유효성 검사 규칙 정의
  const isPasswordValid = (password) => {
    return password.length >= 7;
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);

    const isValid = isPasswordValid(password);

    if (!isValid) {
      setPasswordError('패스워드는 최소 8자 이상이어야 합니다.');
    } else {
      setPasswordError('');
    }
  };

  // 로그인 데이터 양식 전달 시 검사 규칙 정의
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!username && !password) {
      window.alert('이메일과 패스워드를 입력해주시기 바랍니다.');
      return;
    }

    if (isEmailValid(username) && isPasswordValid(password)) {
      //유효한 데이터를 서버로 전송한다.
      try {
        const response = await axios.post(
          `https://api.celebee.kro.kr/members/login`,
          {
            username,
            password,
          },
        );
        if (response.status === 200) {
          const token = response.headers.authorization;
          const refresh = response.headers.refresh;
          const myId = response.headers.memberid;
          localStorage.setItem('jwtToken', token);
          localStorage.setItem('refresh', refresh);
          localStorage.setItem('myId', myId);

          console.log('성공');
          dispatch(login(token));
          dispatch(fetchMyData(myId));
          navigate('/');
        }
      } catch (error) {
        setIsError(alert('아이디와 비밀번호를 확인해주세요.'));
        console.error('에러발생', error);
      }
    }
  };

  return (
    <LoginBody>
      <Logincontainer>
        <OauthLoginButton />
        <EmailLoginForm
          username={username}
          password={password}
          handleUsernameChange={handleUsernameChange}
          handlePasswordChange={handlePasswordChange}
          eamilError={eamilError}
          passwordError={passwordError}
        />
        <Button style="login" text="Log In" onClick={handleLogin} />
        {isError && <p>{isError}</p>}
      </Logincontainer>
    </LoginBody>
  );
};

export default LoginPage;
