import { styled } from 'styled-components';

const OauthButton = styled.button`
  background-color: white;
  border: 1px solid #d9d9d9;
  border-radius: 20px;
  width: auto;
  padding: 30px 10px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 15px;
  cursor: pointer;
  box-shadow: 1px 3px 4px rgb(0, 0, 0, 0.4);

  .brand-logo {
    margin-left: 0;
    img {
      width: 40px;
      height: 40px;
    }
  }

  div {
    margin-left: 10px;
    margin-right: 10px;
  }
`;

const OauthLoginButton = () => {
  const handleKakaoBtnClick = () => {
    window.location.assign(
      `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=f7f26eaa2223cfbd3da88212c84375c4&redirect_uri=http://celebee-bucket.s3-website.ap-northeast-2.amazonaws.com/oauth/kakao/login`,
    );
  };

  return (
    <OauthButton onClick={handleKakaoBtnClick}>
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
