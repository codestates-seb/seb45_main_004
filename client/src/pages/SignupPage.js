import { styled } from 'styled-components';

const SignupPage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 20px;
  margin: 0px 320px;
  .signup-form-sex {
    display: flex;
    flex-direction: row;
  }
  .sex-men {
    margin-right: 25px;
  }
`;

const InputStyle = styled.input`
  border: none;
  border-bottom: 1px solid black;
  background: transparent;
  font-size: 20px;
  width: 300px;
  height: 50px;
  margin-bottom: 20px;
`;

const InputCheckbox = styled.input`
  margin: 0px 5px 20px 0px;
  width: 15px; /* 원하는 가로 크기 */
  height: 15px;
`;

export default function Signuppage() {
  return (
    <SignupPage>
      <div className="signup-page-container">
        <div className="signup-form">
          <div className="signup-form-name">
            <InputStyle type="nickname" id="nickname" placeholder="Nickname" />
          </div>
          <div className="signup-form-sex">
            <div className="sex-men">
              <InputCheckbox type="checkbox" id="checkbox" />
              <label htmlFor="men">Men</label>
            </div>
            <div className="sex-women">
              <InputCheckbox type="checkbox" id="checkbox" />
              <label htmlFor="women">Women</label>
            </div>
          </div>
          <div className="signup-form-email">
            <InputStyle type="email" id="email" placeholder="E-mail" />
          </div>
          <div className="signup-form-password">
            <InputStyle type="password" id="password" placeholder="Password" />
          </div>
          <div className="signup-form-agree">
            <InputCheckbox type="checkbox" id="checkbox" />
            <span className="agree-text">개인 정보를 수집 및 이용합니다.</span>
          </div>
          <div className="signup-form-submit">
            <button className="singup-submit-btn">Sign Up</button>
          </div>
        </div>
      </div>
    </SignupPage>
  );
}
