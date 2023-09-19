import { styled } from 'styled-components';
import { Icon } from '@iconify/react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import axios from 'axios';
import Button from './Button';
import IsLoginAvatar from './IsLoginAvatar';

const ProfileContainer = styled.div`
  display: flex;
  height: 100%;
  margin-bottom: 2em;
  position: relative;
  width: 100%;
`;

const UserInfoContainer = styled.div`
  margin-top: 20px;
  margin-right: 10px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  font-size: 1.3rem;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const InfoBox = styled.div`
  display: flex;
  align-items: center;
  margin-left: 5px;
  margin-bottom: 15px;

  b,
  p {
    width: auto;
    padding-left: 12px;
    padding-right: 12px;
    margin: 0;
  }

  span {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .gender-sign {
    width: 40px;
    height: 40px;
  }
`;

const IntroContainer = styled.div`
  margin-right: 15px;
`;

const IntorBox = styled.div`
  border: 1px solid black;
  height: 4.8em;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  margin-left: 15px;
  margin-right: 10px;
  position: relative;

  input {
    position: absolute;
    left: 0;
    bottom: 0;
    height: 100%;
    width: 100%;
    margin-top: 5px;
    font-size: 1.2rem;
    padding: 10px;
  }
`;

const BtnBox = styled.div`
  position: relative;
`;

const MyProfile = ({ myData, setMyData }) => {
  const { email, gender, introduce, nickname, follower, following } = myData;

  const [isIntroEditing, setIsIntroEditing] = useState(false);

  /* 함수에서 공통으로 사용할 데이터 */
  const token = localStorage.getItem('jwtToken');
  const myId = localStorage.getItem('myId');

  const patchData = {
    introduce,
  };

  /* 자기 소개글 수정 */
  const handleIntroEditClick = () => {
    setIsIntroEditing(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMyData((myData) => ({
      ...myData,
      [name]: value,
    }));
  };

  const handleIntroChange = async () => {
    if (token) {
      try {
        if (patchData.introduce.length < 1 || patchData.introduce.length > 20) {
          alert('소개글은 1자 이상 20자 이하로 작성해 주세요.');
        } else {
          const response = await axios.patch(
            `https://api.celebee.kro.kr/members/${myId}`,
            patchData,
            {
              headers: {
                Authorization: token,
              },
            },
          );
          setIsIntroEditing(false);
          console.log('PATCH 요청 성공!', response.data);
        }
      } catch (error) {
        console.log('PATCH 요청 실패!', error);
      }
    } else {
      console.error('토큰이 없으므로 PATCH 요청을 보낼 수 없습니다.');
    }
  };

  return (
    <ProfileContainer>
      <IsLoginAvatar myData={myData} setMyData={setMyData} />

      <UserInfoContainer>
        {/* 로그인 정보의 닉네임과 이메일이 표시됨 */}
        <InfoBox>
          <b className="nickname">{nickname}</b>
          <p className="address-box">{email}</p>
          {/* 로그인 정보의 젠더 정보에 따라 다른 아이콘이 렌더링 */}
          <span>
            {gender === 'male' ? (
              <Icon icon="emojione-v1:boy" className="gender-sign" />
            ) : (
              <Icon icon="emojione-v1:girl" className="gender-sign" />
            )}
          </span>
        </InfoBox>
        {/* 로그인 정보의 follower, follwing이 표시됨 */}
        <InfoBox>
          <b className="follow-info">Follower</b>
          {/* 숫자는 일천단위 K, 일만단위 M 으로 표시 */}
          <p className="follow-info">{follower}</p>
          <b className="follow-info">Following</b>
          {/* 숫자는 일천단위 K, 일만단위 M 으로 표시 */}
          <p className="follow-info">{following}</p>
        </InfoBox>
        {/* 유저 정보의 자기소개내용 표시 */}
        {isIntroEditing ? (
          <IntroContainer>
            <IntorBox>
              <input
                name="introduce"
                value={introduce}
                onChange={handleInputChange}
                placeholder="자기소개를 입력해주세요."
              />
            </IntorBox>
            <BtnBox>
              <Button type="text" text="Save" onClick={handleIntroChange} />
            </BtnBox>
          </IntroContainer>
        ) : (
          <IntroContainer>
            <IntorBox className="introduction-box">
              <p>{introduce}</p>
            </IntorBox>
            <BtnBox>
              <Button type="text" text="Edit" onClick={handleIntroEditClick} />
            </BtnBox>
          </IntroContainer>
        )}
      </UserInfoContainer>
    </ProfileContainer>
  );
};

MyProfile.propTypes = {
  myData: PropTypes.object.isRequired,
  setMyData: PropTypes.func.isRequired,
  memberData: PropTypes.object.isRequired,
};

export default MyProfile;
