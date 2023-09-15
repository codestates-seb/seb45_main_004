import { styled } from 'styled-components';
import { Icon } from '@iconify/react';
import PropTypes from 'prop-types';
import NotLoginAvatar from './NotLoginAvatar';

const MemberProfileContainer = styled.div`
  display: flex;
  justify-content: space-around;
  height: 100%;
  margin-bottom: 2em;
  margin-left: 80px;
  margin-right: 80px;
  position: relative;
`;

const UserInfoContainer = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
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
    padding-left: 10px;
    padding-right: 10px;
    margin: 0;
  }

  span {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .gender-sign {
    width: 30px;
    height: 30px;
  }
`;

const IntorBox = styled.div`
  border: 1px solid black;
  width: 50vw;
  height: 4.8em;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  margin-left: 15px;
  position: relative;

  input {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 49.89vw;
    height: 100%;
    margin-top: 5px;
    font-size: 1.2rem;
    padding: 10px;
  }
`;

const MemberProfile = ({ memberData }) => {
  const { email, gender, introduce, nickname, follower, following } =
    memberData;

  return (
    <MemberProfileContainer>
      <NotLoginAvatar memberData={memberData} />

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
        <div>
          <IntorBox className="introduction-box">
            <p>{introduce}</p>
          </IntorBox>
        </div>
      </UserInfoContainer>
    </MemberProfileContainer>
  );
};

MemberProfile.propTypes = {
  memberData: PropTypes.object.isRequired,
};

export default MemberProfile;
