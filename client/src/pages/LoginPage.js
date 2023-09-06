import Button from '../components/Button';
import OauthLoginButton from '../components/OauthLoginButton';
import EmailLoginForm from '../components/EmailLoginForm';
import { styled } from 'styled-components';

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
  return (
    <LoginBody>
      <Logincontainer>
        <OauthLoginButton />
        <EmailLoginForm />
        <Button type="login" text="Log In" />
      </Logincontainer>
    </LoginBody>
  );
};

export default LoginPage;
