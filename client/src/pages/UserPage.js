import { styled } from 'styled-components';
import axios from 'axios';
import { useEffect, useState } from 'react';
import MemberProfile from '../components/MemberProfile';
import MyPageTab from '../components/MyPageTab';

const MemberPageSection = styled.section`
  display: flex;
  justify-content: center;
`;

const ContentsContainer = styled.div`
  margin-top: 20px;
  margin-left: 320px;
  margin-right: 320px;
  display: flex;
  flex-direction: column;
`;

const UserPage = () => {
  const [memberData, setMemberData] = useState({
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

  const userId = localStorage.getItem('clickedUserId');
  useEffect(() => {
    if (!memberData.id) {
      const fetchUserInfo = async () => {
        try {
          const response = await axios.get(
            `http://3.39.76.109:8080/members/${userId}`,
          );
          const memberInfo = response.data;
          const userData = {
            id: memberInfo.id,
            nickname: memberInfo.nickname,
            email: memberInfo.email,
            gender: memberInfo.gender,
            introduce: memberInfo.introduce,
            imageUrl: memberInfo.imageUrl,
            follower: memberInfo.follower,
            following: memberInfo.following,
            applicants: memberInfo.applicants,
            boardLikes: memberInfo.boardLikes,
          };
          setMemberData(userData);
        } catch (error) {
          console.error(error);
        }
      };

      fetchUserInfo();
    }
  }, [userId]);

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <MemberPageSection>
      <ContentsContainer>
        <MemberProfile memberData={memberData} />
        <MyPageTab
          activetab={activetab}
          handleTabClick={handleTabClick}
          memberData={memberData}
        />
      </ContentsContainer>
    </MemberPageSection>
  );
};
export default UserPage;
