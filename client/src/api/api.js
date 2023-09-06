import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = 'http://3.39.76.109:8080';

const EmailLogin = async (userId, userPassword) => {
  const navigate = useNavigate();
  try {
    const response = await axios.post(`${API_BASE_URL}/members/login`, {
      userId,
      userPassword,
    });
    if (response.status === 200) {
      const token = response.headers.authrization;
      localStorage.setItem('jwtToken', token);
      console.log('성공');
      navigate('/');
    }
  } catch (error) {
    console.error('에러발생', error);
    throw error;
  }
};

export default { EmailLogin };
