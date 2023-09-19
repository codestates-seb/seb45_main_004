import { styled } from 'styled-components';
import MyPageTab from '../components/MyPageTab';
import axios from 'axios';
import { useEffect, useState } from 'react';
import MyProfile from '../components/MyProfile';
//import { useSelector } from 'react-redux';

const MyPageSection = styled.section`
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: 1196px;
`;

const ContentsContainer = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  width: 100%;

  @media screen and (max-width: 768px) {
    margin: 0 20px;
  }
`;

//레이아웃 부터 잡기!
const MyPage = () => {
  const [myData, setMyData] = useState({
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
  const token = localStorage.getItem('jwtToken');

  useEffect(() => {
    // user 데이터가 비어있을 때만 API 호출
    if (!myData.id) {
      const fetchMyInfo = async () => {
        try {
          const response = await axios.get(
            `https://api.celebee.kro.kr/members/me`,
            {
              headers: {
                Authorization: token,
              },
            },
          );
          const myInfo = response.data;
          const userData = {
            id: myInfo.id,
            nickname: myInfo.nickname,
            email: myInfo.email,
            gender: myInfo.gender,
            introduce: myInfo.introduce,
            imageUrl: myInfo.imageUrl,
            follower: myInfo.follower,
            following: myInfo.following,
            applicants: myInfo.applicants,
            boardLikes: myInfo.boardLikes,
          };
          setMyData(userData);
        } catch (error) {
          console.error(error);
        }
      };
      fetchMyInfo();
    }
  }, []);

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <MyPageSection>
      <ContentsContainer>
        <MyProfile myData={myData} setMyData={setMyData} />
        <MyPageTab
          activetab={activetab}
          handleTabClick={handleTabClick}
          myData={myData}
        />
      </ContentsContainer>
    </MyPageSection>
  );
};

export default MyPage;
