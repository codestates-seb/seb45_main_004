import { useState } from 'react';
import { styled } from 'styled-components';
import axios from 'axios';

const SignupPage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 16px;
  margin: 0px 320px;
  .signup-form-sex {
    display: flex;
    flex-direction: row;
  }
  .singup-submit-btn {
    width: 300px;
    height: 50px;
    border-radius: 10px;
    border: none;
    color: white;
    font-size: 15px;
    background-color: #0a95ff;
  }
  .agree-text {
    font-size: 15px;
  }
  .signup-form-agree {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 20px;
  }
  .agree-text {
    margin-left: 5px;
  }
  .agree-checkbox {
    width: 13px;
    height: 13px;
  }
`;

const InputStyle = styled.input`
  border: none;
  border-bottom: 1px solid black;
  background: transparent;
  width: 300px;
  height: 50px;
  font-size: 15px;
  margin-bottom: 20px;
`;

const GenderStylebox = styled.div`
  margin-right: 25px;
  display: flex;
  flex-direction: row;
  align-items: center;
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

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  const handleSignup = async () => {
    try {
      const userData = {
        email: email,
        nickname: nickname,
        gender: gender,
        password: password,
      };

      const response = await axios.post(
        `http://3.39.76.109:8080/members`,
        userData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      const { token } = response.data;
      localStorage.setItem('token', token);
      // const response = await fetch(`http://3.39.76.109:8080/members`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(userData),
      // });

      // const data = await response.json();
      // const { token } = data;
      // localStorage.setItem('token', token);

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
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="signup-form-password">
            <InputStyle
              type="password"
              id="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
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
              Collect and use your personal information.
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
