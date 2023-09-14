import { styled } from 'styled-components';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import PropTypes from 'prop-types';

const FollowIconBox = styled.span`
  background-color: white;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  position: absolute;
  bottom: 0;
  right: 0;
  cursor: pointer;

  .follow-btn {
    width: 40px;
    height: 40px;
    border: 0;
    border-radius: 50%;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .follow-icon {
    width: 30px;
    height: 30px;
    color: red;
  }
`;

const Follow = ({ handleFollowChange, handleUnFollowChange }) => {
  const [selectedFollow, setSelectedFollow] = useState(false);

  const handleFollowClick = () => {
    setSelectedFollow(true);
  };

  const handleUnfollowClick = () => {
    setSelectedFollow(false);
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
