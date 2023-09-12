import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Kakao() {
  const navigate = useNavigate();

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('code');
    console.log('인가코드', code);
    if (code) {
      const data = {
        provider: 'kakao',
        code: code,
      };
      axios
        .post(`http://3.39.76.109:8080/oauth/login`, data)
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            const authHeader = response.headers.authorization;
            const token = authHeader.replace('Bearer ', '');
            localStorage.setItem('jwtToken', token);
            console.log('성공했니');

            navigate('/');
          }
        })
        .catch((error) => {
          console.log('에러', error);
        });
    }
  }, []);
  return <div></div>;
}
