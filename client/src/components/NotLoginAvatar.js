import { styled } from 'styled-components';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import axios from 'axios';
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

  .profile-img {
    width: 200px;
    height: 200px;
    border-radius: 50%;
  }
`;

const NotLoginAvatar = ({ memberData }) => {
  const { follower, following } = memberData;
  // const [isFollowing, setIsFollowing] = useState(0);

  /* 함수에서 공통으로 사용할 데이터 */
  const token = useSelector((state) => state.auth.token);
  const toMemberId = useSelector((state) => state.user.memberId);

  /* 팔로잉, 언팔로잉 */
  const followData = {
    following,
    follower,
  };

  const handleFollowChange = async () => {
    if (token) {
      try {
        const response = await axios.post(
          `https://api.celebee.kro.kr/follows/${toMemberId}`,
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
          `https://api.celebee.kro.kr/follows/${toMemberId}`,
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
      <AvatarContainer>
        <img
          src={memberData.imageUrl}
          alt="프로필 이미지"
          className="profile-img"
        />
        <Follow
          handleFollowChange={handleFollowChange}
          handleUnFollowChange={handleUnFollowChange}
        />
      </AvatarContainer>
    </>
  );
};

NotLoginAvatar.propTypes = {
  memberData: PropTypes.object.isRequired,
};

export default NotLoginAvatar;
