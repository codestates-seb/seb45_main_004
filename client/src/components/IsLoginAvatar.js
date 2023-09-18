import { styled } from 'styled-components';
import { Icon } from '@iconify/react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from './Modal';
import Follow from './Follow';

const AvatarContainer = styled.div`
  width: 200px;
  height: 200px;
  border: 1px solid rgba(245, 245, 245, 1);
  border-radius: 50%;
  background-color: rgba(256, 256, 256);
  box-shadow: 0px 3px 7px 1px rgba(105, 105, 105, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  margin-right: 20px;
  margin-left: 10px;
  position: relative;

  .default-img {
    width: 200px;
    height: 200px;
    color: #d99bff;
  }

  .profile-img {
    width: 200px;
    height: 200px;
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
    cursor: pointer;
  }
`;

const EditIconBox = styled.span`
  background-color: white;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 0;
  right: 0;
  cursor: pointer;

  .edit-icon {
    width: 38px;
    height: 38px;
  }
`;

const IsLoginAvatar = ({ myData, setMyData }) => {
  const { follower, following } = myData;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isImages, setIsImages] = useState([]);

  /* 함수에서 공통으로 사용할 데이터 */
  const token = localStorage.getItem('jwtToken');
  const myId = localStorage.getItem('myId');
  const isLogin = useSelector((state) => state.auth.isLogin);
  const toMemberId = useSelector((state) => state.user.memberId);

  /* 수정할 프로필 이미지 받아오기 */
  useEffect(() => {
    const getProfileImg = async () => {
      try {
        const response = await axios.get(
          'http://3.39.76.109:8080/members/images',
        );
        setIsImages(response.data);
      } catch (error) {
        console.error('실패', error);
      }
    };

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
        const response = await axios.patch(
          `http://3.39.76.109:8080/members/${myId}`,
          { imageUrl }, // 이미지 URL을 보냅니다.
          {
            headers: {
              Authorization: token,
            },
          },
        );
        const newImageUrl = response.data.imageUrl;
        setMyData({ ...myData, imageUrl: newImageUrl }); // imageUrl 업데이트
        closeModal();

        console.log('프로필 이미지 업로드 성공');
      } catch (error) {
        console.error('프로필 이미지 업로드 실패', error);
      }
    }
  };

  /* 팔로잉, 언팔로잉 */
  const followData = {
    following,
    follower,
  };

  const handleFollowChange = async () => {
    if (token) {
      try {
        const response = await axios.post(
          `http://3.39.76.109:8080/follows/${toMemberId}`,
          followData,
          {
            headers: {
              Authorization: token,
            },
          },
        );
        console.log('POST 요청 성공!', response.data);
      } catch (error) {
        console.log('PATCH 요청 실패!', error);
      }
    } else {
      console.error('토큰이 없으므로 PATCH 요청을 보낼 수 없습니다.');
    }
  };

  const handleUnFollowChange = async () => {
    if (token) {
      try {
        const response = await axios.delete(
          `http://3.39.76.109:8080/follows/${toMemberId}`,
          {
            headers: {
              Authorization: token,
            },
          },
        );
        console.log('DELETE 요청 성공!', response.data);
      } catch (error) {
        console.log('PATCH 요청 실패!', error);
      }
    } else {
      console.error('토큰이 없으므로 PATCH 요청을 보낼 수 없습니다.');
    }
  };

  return (
    <>
      {isLogin ? (
        <AvatarContainer>
          {myData.id ? (
            <EditIconBox onClick={openModal}>
              <Icon className="edit-icon" icon="uil:edit" color="#9669f7" />
            </EditIconBox>
          ) : (
            <Follow
              handleFollowChange={handleFollowChange}
              handleUnFollowChange={handleUnFollowChange}
            />
          )}

          {myData.imageUrl ? (
            <img
              src={myData.imageUrl}
              alt="프로필 이미지"
              className="profile-img"
            />
          ) : (
            <Icon icon="mingcute:ghost-line" className="default-img" />
          )}
        </AvatarContainer>
      ) : (
        <AvatarContainer>
          <Icon icon="mingcute:ghost-line" className="default-img" />
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
    </>
  );
};

IsLoginAvatar.propTypes = {
  myData: PropTypes.object.isRequired,
  setMyData: PropTypes.func.isRequired,
};

export default IsLoginAvatar;
