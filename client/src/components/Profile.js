import { styled } from 'styled-components';
import { Icon } from '@iconify/react';
import PropTypes from 'prop-types';

const ProfileContainer = styled.div`
  width: 76vw;
  height: 100%;
  display: flex;
  margin-bottom: 2em;
`;

const AvatarContainer = styled.div`
  width: 150px;
  height: 150px;
  border: 1px solid rgba(245, 245, 245, 1);
  border-radius: 50%;
  background-color: #f5f5f5;
  box-shadow: 0px 3px 7px 1px rgba(105, 105, 105, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  margin-right: 25px;
  position: relative;

  .avatar-img {
    width: 100px;
    height: 100px;
    color: #d99bff;
  }
`;

const EditIconBox = styled.span`
  background-color: white;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 0;
  right: 0;

  .edit-icon {
    width: 30px;
    height: 30px;
  }
`;

const UserInfoContainer = styled.div`
  margin-top: 30px;
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  font-size: 1.3rem;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  .info-box {
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
  }

  .gender-sign {
    width: 30px;
    height: 30px;
  }

  .introduction-box {
    border: 1px solid black;
    width: 50vw;
    height: 4.8em;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 0;
    margin-top: 10px;
    margin-left: 15px;
  }
`;

const Profile = ({ user }) => {
  const { email, gender, introduce, nickname } = user;

  return (
    <ProfileContainer>
      <AvatarContainer>
        <Icon icon="mingcute:ghost-line" className="avatar-img" />
        <EditIconBox>
          <Icon className="edit-icon" icon="uil:edit" color="#9669f7" />
        </EditIconBox>
      </AvatarContainer>
      <UserInfoContainer>
        {/* 로그인 정보의 닉네임과 이메일이 표시됨 */}
        <div className="info-box">
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
        </div>
        {/* 로그인 정보의 follower, follwing이 표시됨 */}
        <div className="info-box">
          <b className="follow-info">Follower</b>
          {/* 숫자는 일천단위 K, 일만단위 M 으로 표시 */}
          <p className="follow-info">1.3M</p>
          <b className="follow-info">Following</b>
          {/* 숫자는 일천단위 K, 일만단위 M 으로 표시 */}
          <p className="follow-info">1K</p>
        </div>
        {/* 유저 정보의 자기소개내용 표시 */}
        <div className="introduction-box">
          <p>{introduce}</p>
        </div>
      </UserInfoContainer>
    </ProfileContainer>
  );
};

Profile.propTypes = {
  user: PropTypes.object.isRequired,
};
export default Profile;
