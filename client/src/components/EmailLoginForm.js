import { styled } from 'styled-components';
import PropTypes from 'prop-types';

const MailLoginform = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 35px;

  .title-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;

    a {
      color: white;
      text-decoration: none;
      font-size: 1rem;
    }
  }

  .input-box {
    margin-bottom: 30px;

    input {
      width: 100%;
      height: 80px;
      border: 0;
      border-radius: 10px;
      padding-left: 10px;
      padding-right: 10px;
      font-size: 1.2rem;
    }
  }
`;

const EmailLoginForm = ({
  userId,
  userPassword,
  handleUserIdChange,
  handleUserPasswordChange,
  eamilError,
  passwordError,
}) => {
  return (
    <MailLoginform>
      <div className="title-box">
        <b>Email</b>
      </div>
      <div className="input-box">
        <input
          type="text"
          id="userId"
          value={userId}
          onChange={handleUserIdChange}
        />
        {eamilError && <p className="error">{eamilError}</p>}
      </div>
      <div className="title-box">
        <b>Password</b>
        <a href="/">Forgot password?</a>
      </div>
      <div className="input-box">
        <input
          type="text"
          id="userPassword"
          value={userPassword}
          onChange={handleUserPasswordChange}
        />
        {passwordError && <p className="error">{passwordError}</p>}
      </div>
    </MailLoginform>
  );
};

EmailLoginForm.propTypes = {
  userId: PropTypes.string.isRequired,
  userPassword: PropTypes.string.isRequired,
  handleUserIdChange: PropTypes.func.isRequired,
  handleUserPasswordChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  eamilError: PropTypes.string.isRequired,
  passwordError: PropTypes.string.isRequired,
};

export default EmailLoginForm;
