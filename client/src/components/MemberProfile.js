import { styled } from 'styled-components';
import { Icon } from '@iconify/react';
import PropTypes from 'prop-types';
import NotLoginAvatar from './NotLoginAvatar';

const MemberProfileContainer = styled.div`
  display: flex;
  height: 100%;
  margin-bottom: 2em;
  position: relative;
  width: 100%;

  @media (max-width: 768px) {
    margin-bottom: 1em;
  }
`;

const UserInfoContainer = styled.div`
  margin-top: 20px;
  margin-right: 10px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  font-size: 1.3rem;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  @media (max-width: 768px) {
    font-size: 1rem;
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

const InfoBox = styled.div`
  display: flex;
  margin-left: 5px;
  margin-bottom: 15px;

  .text-info {
    display: flex;
    align-items: center;
  }

  .nickname,
  .address-box {
    width: auto;
    padding-left: 12px;
    padding-right: 12px;
  }

  .gender-info {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .gender-sign {
    width: 40px;
    height: 40px;
  }

  @media (max-width: 560px) {
    margin-bottom: 7px;

    .text-info {
      display: flex;
      flex-direction: column;
      align-items: start;
    }

    .nickname {
      margin-bottom: 7px;
    }

    .gender-info {
      margin-left: 5px;
    }

    .gender-sign {
      width: 32px;
      height: 32px;
    }
  }
  @media (max-width: 480px) {
    margin-bottom: 5px;

    .nickname {
      margin-bottom: 7px;
    }

    .gender-info {
      margin-left: 5px;
    }

    .gender-sign {
      width: 24px;
      height: 24px;
    }
  }
  @media (max-width: 390px) {
    .gender-info {
      position: relative;
    }

    .gender-sign {
      position: absolute;
      top: 0;
      right: 10px;
      width: 24px;
      height: 24px;
    }
  }
`;

const FollowContainer = styled.div`
  display: flex;
  margin-left: 5px;
  margin-bottom: 15px;

  .follow-box {
    display: flex;
  }

  .follow-info {
    width: auto;
    padding-left: 12px;
    padding-right: 12px;
    margin: 0;
  }

  @media (max-width: 560px) {
    margin-bottom: 7px;
  }

  @media (max-width: 390px) {
    margin-bottom: 7px;

    .follow-box {
      flex-direction: column;
    }
  }
`;

const IntorBox = styled.div`
  border: 1px solid black;
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
    width: 100%;
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
          <div className="text-info">
            <b className="nickname">{nickname}</b>
            <p className="address-box">{email}</p>
          </div>
          {/* 로그인 정보의 젠더 정보에 따라 다른 아이콘이 렌더링 */}
          <span className="gender-info">
            {gender === 'male' ? (
              <Icon icon="emojione-v1:boy" className="gender-sign" />
            ) : (
              <Icon icon="emojione-v1:girl" className="gender-sign" />
            )}
          </span>
        </InfoBox>
        {/* 로그인 정보의 follower, follwing이 표시됨 */}
        <FollowContainer>
          <div className="follow-box">
            <b className="follow-info">Follower</b>
            {/* 숫자는 일천단위 K, 일만단위 M 으로 표시 */}
            <p className="follow-info">{follower}</p>
          </div>
          <div className="follow-box">
            <b className="follow-info">Following</b>
            {/* 숫자는 일천단위 K, 일만단위 M 으로 표시 */}
            <p className="follow-info">{following}</p>
          </div>
        </FollowContainer>
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
