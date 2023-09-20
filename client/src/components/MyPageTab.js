import { styled } from 'styled-components';
import PropTypes from 'prop-types';
import Button from './Button';
import LikeIt from './LikeIt';
import Participations from './Participations';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const MyTabContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 50px;
`;

const MyTabBtn = styled.div`
  display: flex;
  list-style-type: none;
`;

const TabContentContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 40px;
  width: 100%;

  @media screen and (max-width: 768px) {
    margin: 50px 20px;
  }
`;

const MyPageTab = ({ activetab, handleTabClick, myData, memberData }) => {
  const navigate = useNavigate();
  const [selectedBoardId, setSelectedBoardId] = useState(null);

  const handleMovingBoard = (boardId) => {
    setSelectedBoardId(boardId);
    navigate(`/boards/${boardId}`);
    selectedBoardId;
  };

  return (
    <MyTabContainer>
      <MyTabBtn>
        <Button
          text="Like It"
          type="like"
          label="tab1"
          onClick={() => {
            handleTabClick('tab1');
          }}
        />
        <Button
          text="Joined"
          type="participations"
          label="tab2"
          onClick={() => {
            handleTabClick('tab2');
          }}
        />
      </MyTabBtn>
      <TabContentContainer>
        {activetab === 'tab1' && (
          <LikeIt
            myData={myData}
            memberData={memberData}
            handleMovingBoard={handleMovingBoard}
          />
        )}
        {activetab === 'tab2' && (
          <Participations
            myData={myData}
            memberData={memberData}
            handleMovingBoard={handleMovingBoard}
          />
        )}
      </TabContentContainer>
    </MyTabContainer>
  );
};

MyPageTab.propTypes = {
  activetab: PropTypes.string.isRequired,
  handleTabClick: PropTypes.func.isRequired,
  myData: PropTypes.object.isRequired,
  memberData: PropTypes.object.isRequired,
};
export default MyPageTab;
