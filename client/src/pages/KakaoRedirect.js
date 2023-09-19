import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login, fetchMyData } from '../redux/actions';
import { styled } from 'styled-components';

export default function Kakao() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('code');
    console.log('인가코드', code);
    if (code) {
      const data = {
        provider: 'kakao',
        code: code,
      };
      axios
        .post(`https://api.celebee.kro.kr/oauth/login`, data)
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            const token = response.headers.authorization;
            const myId = response.headers.memberid;
            localStorage.setItem('jwtToken', token);
            localStorage.setItem('myId', myId);
            console.log('성공했니');
            dispatch(login(token));
            dispatch(fetchMyData(myId));
            navigate('/');
          }
        })
        .catch((error) => {
          console.log('에러', error);
        });
    }
  }, []);
  return (
    <KakaoStyle>
      <div className="loading">
        <LoadImg />
      </div>
    </KakaoStyle>
  );
}

const KakaoStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
`;

const LoadImg = styled.div`
  display: inline-block;
  width: 80px;
  height: 80px;
  position: fixed;
  top: 50%;
  left: 47%;
  &::after {
    content: '';
    display: block;
    width: 70px;
    height: 70px;
    margin: 8px;
    border-radius: 50%;
    border: 4px solid #e5dada;
    border-color: #e5dada transparent #e5dada transparent;
    animation: Spinner 1.2s linear infinite;
  }
  @keyframes Spinner {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
