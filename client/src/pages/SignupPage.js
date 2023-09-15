import { useState } from 'react';
import { styled } from 'styled-components';
import axios from 'axios';

const SignupPage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
  font-size: 16px;
  margin: 0px 320px;
  .signup-form-sex {
    display: flex;
    flex-direction: row;
    padding-left: 5px;
    margin-bottom: 10px;
  }
  .singup-submit-btn {
    width: 340px;
    height: 50px;
    border-radius: 20px;
    border: none;
    color: white;
    font-size: 15px;
    font-weight: 500;
    background-color: #0a95ff;
    cursor: pointer;
    box-shadow: 1px 3px 4px rgb(0, 0, 0, 0.4);
  }
  .agree-text {
    font-size: 15px;
  }
  .signup-form-agree {
    display: flex;
    flex-direction: row;
    margin-bottom: 20px;
  }
  .agree-text {
    margin-left: 7px;
  }
  .agree-checkbox {
    margin-top: 5px;
    width: 13px;
    height: 13px;
  }
  .passworderror-message {
    margin-bottom: 20px;
  }
  p {
    font-size: 0.9rem;
    color: red;
  }
`;

const InputStyle = styled.input`
  border: none;
  border-bottom: 1px solid black;
  background: transparent;
  width: 340px;
  height: 50px;
  font-size: 15px;
  margin-bottom: 20px;
  caret-color: black;
  padding-left: 10px;
  outline: none;
`;

const GenderStylebox = styled.div`
  margin-right: 25px;
  display: flex;
  flex-direction: row;
  align-items: center;
  caret-color: black;
  .sex-checkbox {
    margin: 0px 5px 0px 0px;
    width: 15px;
    height: 15px;
  }
`;

export default function Signuppage() {
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checkbox, setCheckbox] = useState(false); // 초기값을 false로 설정
  const [gender, setGender] = useState('');
  const [emailerror, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const isEmailValid = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  };

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  // 이메일 유효성 검사
  const handleEmagilChange = (e) => {
    setEmail(e.target.value);

    if (!isEmailValid(e.target.value)) {
      setEmailError('유효한 메일 형식이 아닙니다.');
    } else {
      setEmailError('');
    }
  };

  const isPasswordValid = (password) => {
    return password.length >= 7;
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);

    if (!isPasswordValid(password)) {
      setPasswordError('패스워드는 최소 8자 이상이어야 합니다.');
    } else {
      setPasswordError('');
    }
  };

  const handleSignup = async () => {
    if (!checkbox) {
      window.alert('개인정보 수집 동의란에 체크해주세요');
      return;
    }
    if (!gender) {
      window.alert('성별을 선택해주세요');
      return;
    }

    if (!isPasswordValid(password)) {
      window.alert('패스워드를 확인해주세요');
      return;
    }
    try {
      const userData = {
        email: email,
        nickname: nickname,
        gender: gender,
        password: password,
      };
      await axios.post(`http://3.39.76.109:8080/members`, userData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      setNickname('');
      setEmail('');
      setPassword('');
      setCheckbox(false); // 체크박스 초기값을 false로 설정
      window.alert('회원가입이 완료되었습니다.');
      window.location.href = '/members/login';
    } catch (error) {
      console.error('Error Signing up', error);
    }
  };

  return (
    <SignupPage>
      <div className="signup-page-container">
        <div className="signup-form">
          <div className="signup-form-name">
            <InputStyle
              type="text"
              id="nickname"
              value={nickname}
              placeholder="Nickname"
              onChange={(e) => setNickname(e.target.value)}
            />
          </div>
          <div className="signup-form-sex">
            <GenderStylebox className="sex-men">
              <input
                type="radio"
                name="gender"
                value="male"
                onChange={handleGenderChange}
                className="sex-checkbox"
              />
              <label htmlFor="option1">Men</label>
            </GenderStylebox>
            <GenderStylebox className="sex-women">
              <input
                type="radio"
                value="female"
                name="gender"
                onChange={handleGenderChange}
                className="sex-checkbox"
              />
              <label htmlFor="option1">Women</label>
            </GenderStylebox>
          </div>
          <div className="signup-form-email">
            <InputStyle
              type="text"
              id="email"
              value={email}
              placeholder="E-mail"
              onChange={handleEmagilChange}
            />
            {emailerror && <p className="emailerror-message">{emailerror}</p>}
          </div>
          <div className="signup-form-password">
            <InputStyle
              type="password"
              id="password"
              value={password}
              placeholder="Password"
              onChange={handlePasswordChange}
            />
            {passwordError && (
              <p className="passworderror-message">{passwordError}</p>
            )}
          </div>
          <div className="signup-form-agree">
            <input
              type="checkbox"
              id="checkbox"
              value={checkbox}
              onChange={(e) => setCheckbox(e.target.value)}
              className="agree-checkbox"
            />
            <span className="agree-text">
              I agree to collect and utilize personal
              <br />
              information and receive emails.
            </span>
          </div>
          <div className="signup-form-submit">
            <button
              className="singup-submit-btn"
              onClick={() => {
                handleSignup();
              }}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </SignupPage>
  );
}
