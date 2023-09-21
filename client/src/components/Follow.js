import { styled } from 'styled-components';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import PropTypes from 'prop-types';

const FollowIconBox = styled.span`
  background-color: white;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 0;
  right: 0;
  cursor: pointer;

  .follow-btn {
    border: 0;
    border-radius: 50%;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .follow-icon {
    width: 38px;
    height: 38px;
    color: red;
  }

  @media (max-width: 768px) {
    width: 45px;
    height: 45px;

    .follow-btn {
    }

    .follow-icon {
      width: 28.5px;
      height: 28.5px;
    }
  }
  @media (max-width: 432px) {
    width: 30px;
    height: 30px;

    .follow-btn {
    }

    .follow-icon {
      width: 19px;
      height: 19px;
    }
  }
`;

const Follow = ({ handleFollowChange, handleUnFollowChange }) => {
  const [selectedFollow, setSelectedFollow] = useState(false);

  const handleFollowClick = () => {
    setSelectedFollow(true);
    alert('추후 업데이트 될 기능입니다.');
  };

  const handleUnfollowClick = () => {
    setSelectedFollow(false);
    alert('추후 업데이트 될 기능입니다.');
  };

  return (
    <>
      {!selectedFollow ? (
        <FollowIconBox onClick={handleFollowClick}>
          <button className="follow-btn" onClick={handleFollowChange}>
            <Icon icon="mdi:heart-plus" className="follow-icon" />
          </button>
        </FollowIconBox>
      ) : (
        <FollowIconBox onClick={handleUnfollowClick}>
          <button className="follow-btn" onClick={handleUnFollowChange}>
            <Icon icon="mdi:heart-minus" className="follow-icon" />
          </button>
        </FollowIconBox>
      )}
    </>
  );
};

Follow.propTypes = {
  handleFollowChange: PropTypes.func.isRequired,
  handleUnFollowChange: PropTypes.func.isRequired,
};

export default Follow;
