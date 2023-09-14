import { styled } from 'styled-components';
import PropTypes from 'prop-types';

const MailLoginform = styled.form`
  display: flex;
  flex-direction: column;

  .title-box {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-bottom: 15px;
    color: red;

    a {
      color: white;
      text-decoration: none;
      font-size: 1rem;
    }
  }
  .password {
    margin-bottom: 10px;
  }
  p {
    margin-top: 10px;
    font-size: 0.9rem;
    color: red;
  }

  /* .input-box {
    margin-bottom: 30px;

    input {
      width: 100%;
      height: 80px;
      border: 0;
      border-radius: 10px;
      padding-left: 10px;
      padding-right: 10px;
      font-size: 1.2rem;
      color: red;
    }

    p {
      margin-top: 10px;
      font-size: 0.9rem;
      color: red;
    }
  } */
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

const EmailLoginForm = ({
  username,
  password,
  handleUsernameChange,
  handlePasswordChange,
  eamilError,
  passwordError,
}) => {
  return (
    <MailLoginform>
      <div className="title-box"></div>
      <div className="input-box">
        <InputStyle
          type="text"
          id="userId"
          placeholder="E-mail"
          value={username}
          onChange={handleUsernameChange}
        />
        {eamilError && <p className="error">{eamilError}</p>}
      </div>
      <div className="title-box">
        <a href="/">Forgot password?</a>
      </div>
      <div className="input-box password">
        <InputStyle
          type="password"
          id="userPassword"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
        />
        {passwordError && <p className="error">{passwordError}</p>}
      </div>
    </MailLoginform>
  );
};

EmailLoginForm.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  eamilError: PropTypes.string.isRequired,
  passwordError: PropTypes.string.isRequired,
};

export default EmailLoginForm;
