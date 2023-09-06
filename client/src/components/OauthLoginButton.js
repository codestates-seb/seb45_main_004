import { styled } from 'styled-components';

const OauthButton = styled.button`
  background-color: white;
  border: 0;
  border-radius: 10px;
  width: 430px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  cursor: pointer;

  .brand-logo {
    margin-left: 0;
    img {
      width: 52px;
      height: 52px;
    }
  }

  div {
    margin-left: 10px;
    margin-right: 10px;
  }
`;

const OauthLoginButton = () => {
  return (
    <OauthButton>
      <div className="brand-logo">
        <img
          // eslint-disable-next-line no-undef
          src={process.env.PUBLIC_URL + '/assets/kakaologo_round.png'}
          alt=""
        />
      </div>
      <div className="button-desc">
        <b>Log in with</b>
        <br />
        <b>Kakao</b>
      </div>
    </OauthButton>
  );
};

export default OauthLoginButton;
