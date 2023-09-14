import { styled } from 'styled-components';
import Profile from '../components/Profile';
import MyPageTab from '../components/MyPageTab';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const MyPageSection = styled.section`
  width: 100vw;
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const UserPage = () => {
  const [user, setUser] = useState({
    id: 0,
    nickname: '',
    email: '',
    gender: '',
    introduce: '',
    imageUrl: '',
    follower: 0,
    following: 0,
    applicants: [{ boardId: 0, imgUrl: '' }],
    boardLikes: [{ boardId: 0, imgUrl: '' }],
  });

  const [activetab, setActiveTab] = useState('tab1');

  const memberId = useSelector((state) => state.user.memberId);

  const fetchUserInfo = async () => {
    try {
      const response = await axios.get(
        `http://3.39.76.109:8080/members/${memberId}`,
      );
      const userInfo = response.data;
      const userData = {
        id: userInfo.id,
        nickname: userInfo.nickname,
        email: userInfo.email,
        gender: userInfo.gender,
        introduce: userInfo.introduce,
        imageUrl: userInfo.imageUrl,
        follower: userInfo.follower,
        following: userInfo.following,
        applicants: userInfo.applicants,
        boardLikes: userInfo.boardLikes,
      };
      setUser(userData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <MyPageSection>
      <Profile user={user} setUser={setUser} />
      <MyPageTab
        activetab={activetab}
        handleTabClick={handleTabClick}
        user={user}
      />
    </MyPageSection>
  );
};
export default UserPage;
