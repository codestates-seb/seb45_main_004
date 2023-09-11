import axios from 'axios';
import { useEffect } from 'react';
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
  const handleKakaoBtnClick = () => {
    window.location.assign(
      `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=f7f26eaa2223cfbd3da88212c84375c4&redirect_uri=http://localhost:3000`,
    );
  };
  // const code = new URLSearchParams(window.location.search).get('code');
  // console.log('인가코드', code);
  useEffect(() => {
    const url = new URL(window.location.href);
    const code = url.searchParams.get('code');
    if (code) {
      axios
        .post(`http://3.39.76.109:8080/oauth/login`, {
          provider: 'kakao',
          code: code,
        })
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            const token = response.headers.authorization;
            localStorage.setItem('jwtToken', token);
          }
        })
        .catch((error) => {
          console.log('에러', error);
        });
    }
  }, []);

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
