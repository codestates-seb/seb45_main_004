import { styled } from 'styled-components';
import Profile from '../components/Profile';
import Mytab from '../components/Mytab';
import axios from 'axios';
import { useEffect, useState } from 'react';

const MyPageSection = styled.section`
  width: 100vw;
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

//레이아웃 부터 잡기!
const MyPage = () => {
  const [user, setUser] = useState({});

  const fetchMyInfo = async () => {
    try {
      const response = await axios.get(`http://3.39.76.109:8080/members/1`);
      const myInfo = response.data;
      setUser(myInfo);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMyInfo();
  }, []);

  return (
    <MyPageSection>
      <Profile user={user} />
      <Mytab />
    </MyPageSection>
  );
};

export default MyPage;
