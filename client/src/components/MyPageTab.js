import { styled } from 'styled-components';
import PropTypes from 'prop-types';
import Button from './Button';
import LikeIt from './LikeIt';
import Participations from './Participations';

const MyTabContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 75vw;
  margin-top: 50px;
`;

const MyTabBtn = styled.div`
  display: flex;
  list-style-type: none;
`;

const TabContentContainer = styled.div`
  margin-top: 40px;
  width: 70vw;
`;
const MyPageTab = ({ activetab, handleTabClick, user }) => {
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
          text="Participation"
          type="participations"
          label="tab2"
          onClick={() => {
            handleTabClick('tab2');
          }}
        />
      </MyTabBtn>
      <TabContentContainer>
        {activetab === 'tab1' && <LikeIt user={user} />}
        {activetab === 'tab2' && <Participations user={user} />}
      </TabContentContainer>
    </MyTabContainer>
  );
};

MyPageTab.propTypes = {
  activetab: PropTypes.string.isRequired,
  handleTabClick: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};
export default MyPageTab;
