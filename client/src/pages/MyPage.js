import { styled } from 'styled-components';
import Profile from '../components/Profile';
import MyPageTab from '../components/MyPageTab';
import axios from 'axios';
import { useEffect, useState } from 'react';
// import api from '../api/api';

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
  const [activetab, setActiveTab] = useState('tab1');

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

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <MyPageSection>
      <Profile user={user} />
      <MyPageTab
        activetab={activetab}
        handleTabClick={handleTabClick}
        user={user}
      />
    </MyPageSection>
  );
};

export default MyPage;
