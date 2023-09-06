import { styled } from 'styled-components';

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
const EmailLoginForm = () => {
  return (
    <MailLoginform>
      <div className="title-box">
        <b>Email</b>
      </div>
      <div className="input-box">
        <input type="text" />
      </div>
      <div className="title-box">
        <b>Password</b>
        <a href="/">Forgot password?</a>
      </div>
      <div className="input-box">
        <input type="text" />
      </div>
    </MailLoginform>
  );
};
export default EmailLoginForm;
