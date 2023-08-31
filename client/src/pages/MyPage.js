import { styled } from 'styled-components';
import Profile from '../components/Profile';

const MyInfoSection = styled.section`
  width: 100vw;
  height: 17em;
  margin-top: 20px;
  display: flex;
  justify-content: center;
`;

//레이아웃 부터 잡기!
const MyPage = () => {
  return (
    <MyInfoSection>
      <Profile />
    </MyInfoSection>
  );
};

export default MyPage;
