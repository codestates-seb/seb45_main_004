import { styled } from 'styled-components';

const DibsOnPost = styled.div``;

const ContentRow = styled.li`
  list-style-type: none;
  display: flex;
  justify-content: center;
`;

const ContentItem = styled.div`
  width: 16em;
  height: 16em;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  margin-left: 45px;
  margin-right: 45px;
`;

const LikeIt = () => {
  return (
    <DibsOnPost>
      <ContentRow>
        <ContentItem>
          <b>코딩 같이 할 사람</b>
        </ContentItem>
        <ContentItem>
          <b>인피니트 콘서트 파티 구해요!</b>
        </ContentItem>
        <ContentItem>
          <b>이번 주 일요일 조기축구 파티 구해요!</b>
        </ContentItem>
      </ContentRow>
    </DibsOnPost>
  );
};
export default LikeIt;
