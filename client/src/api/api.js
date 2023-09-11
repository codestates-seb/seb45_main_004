import axios from 'axios';

const API_BASE_URL = 'http://3.39.76.109:8080';

const EmailLogin = async (username, password) => {
  //서버에 저장된 변수명 사용하기!!

  try {
    const response = await axios.post(`${API_BASE_URL}/members/login`, {
      username,
      password,
    });
    if (response.status === 200) {
      const token = response.headers.authorization;
      localStorage.setItem('jwtToken', token);
      console.log('성공');
    }
  } catch (error) {
    console.error('에러발생', error);
    throw error;
  }
};

export default { EmailLogin };
