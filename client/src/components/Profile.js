import { styled } from 'styled-components';
import { Icon } from '@iconify/react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Button from './Button';
import Modal from './Modal';

const ProfileContainer = styled.div`
  width: 76vw;
  height: 100%;
  display: flex;
  margin-bottom: 2em;
  position: relative;
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

  .profile-img {
    width: 150px;
    border-radius: 50%;
  }
`;

const TitleBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  h3 {
    font-size: 1.6rem;
    font-weight: bolder;
  }
`;

const ImgBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 30px;

  button {
    border: 0;
    background-color: rgba(255, 255, 255, 0.95);
    margin-left: 10px;
    margin-right: 10px;
  }
  img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
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
  cursor: pointer;

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

const BtnBox = styled.div`
  position: relative;
`;

const Profile = ({ user, setUser }) => {
  const { email, gender, introduce, nickname, follower, following, imageUrl } =
    user;
  const isLogin = useSelector((state) => state.auth.isLogin);
  const [isIntroEditing, setIsIntroEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isImages, setisImages] = useState([]);

  /* 함수에서 공통으로 사용할 데이터 */
  const token = localStorage.getItem('jwtToken');
  const memberId = useSelector((state) => state.user.memberId);
  const patchData = {
    introduce,
  };

  /* 수정할 프로필 이미지 받아오기 */
  const getProfileImg = async () => {
    try {
      const response = await axios.get(
        'http://3.39.76.109:8080/members/images',
      );
      setisImages(response.data);
    } catch (error) {
      console.error('실패', error);
    }
  };

  useEffect(() => {
    getProfileImg();
  }, []);

  /* 프로필 이미지 수정 - 모달 */
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleImageSelect = async (e) => {
    if (token) {
      try {
        const imageUrl = e.target.currentSrc; // 클릭한 이미지의 URL 가져오기

        // 서버에 이미지 업로드 요청을 보냅니다.
        const response = await axios.patch(
          `http://3.39.76.109:8080/members/${memberId}`,
          { imageUrl: imageUrl }, // 이미지 URL을 보냅니다.
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        // 서버에서 업로드된 이미지의 URL을 받아옵니다.
        const newImageUrl = response.data.imageUrl;

        // 이미지 URL을 state에 업데이트합니다.
        setUser({ ...user, imageUrl: newImageUrl }); // imageUrl 업데이트

        // 모달을 닫습니다.
        closeModal();

        console.log('프로필 이미지 업로드 성공');
      } catch (error) {
        console.error('프로필 이미지 업로드 실패', error);
      }
    }
  };

  /* 자기 소개글 수정 */
  const handleIntroEditClick = () => {
    setIsIntroEditing(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((user) => ({
      ...user,
      [name]: value,
    }));
  };

  const handleIntroChange = async () => {
    if (token) {
      try {
        const response = await axios.patch(
          `http://3.39.76.109:8080/members/${memberId}`,
          patchData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setIsIntroEditing(false);
        console.log('PATCH 요청 성공!', response.data);
      } catch (error) {
        console.log('PATCH 요청 실패!', error);
      }
    } else {
      console.error('토큰이 없으므로 PATCH 요청을 보낼 수 없습니다.');
    }
  };

  return (
    <ProfileContainer>
      {isLogin ? (
        <AvatarContainer>
          <EditIconBox onClick={openModal}>
            <Icon className="edit-icon" icon="uil:edit" color="#9669f7" />
          </EditIconBox>
          {imageUrl ? (
            <img src={imageUrl} alt="프로필 이미지" className="profile-img" />
          ) : (
            <Icon icon="mingcute:ghost-line" className="avatar-img" />
          )}
        </AvatarContainer>
      ) : (
        <AvatarContainer>
          <Icon icon="mingcute:ghost-line" className="avatar-img" />
        </AvatarContainer>
      )}
      {isModalOpen ? (
        <Modal closeModal={closeModal}>
          <TitleBox>
            <h3>Select</h3>
            <br />
            <h3>Yore Profile Image</h3>
          </TitleBox>
          <ImgBox>
            {isImages.map((el, idx) => (
              <button key={idx} onClick={handleImageSelect}>
                <img src={el} alt={`el ${idx}`} />
              </button>
            ))}
          </ImgBox>
        </Modal>
      ) : null}

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
          <div>
            <IntorBox>
              <div>
                <input
                  name="introduce"
                  value={introduce}
                  onChange={handleInputChange}
                  placeholder="자기소개를 입력해주세요."
                />
              </div>
            </IntorBox>
            <BtnBox>
              <Button type="text" text="Save" onClick={handleIntroChange} />
            </BtnBox>
          </div>
        ) : (
          <div>
            <IntorBox className="introduction-box">
              <p>{introduce}</p>
            </IntorBox>
            {isLogin ? (
              <BtnBox>
                <Button
                  type="text"
                  text="Edit"
                  onClick={handleIntroEditClick}
                />
              </BtnBox>
            ) : null}
          </div>
        )}
      </UserInfoContainer>
    </ProfileContainer>
  );
};

Profile.propTypes = {
  user: PropTypes.object.isRequired,
  setUser: PropTypes.func.isRequired,
};

export default Profile;
