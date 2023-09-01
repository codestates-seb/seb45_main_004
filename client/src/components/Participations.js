import { styled } from 'styled-components';

const MyPartyPost = styled.div`
  display: flex;
  flex-direction: column;
`;

const ContentRow = styled.li`
  list-style-type: none;
  display: flex;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 30px;
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

const Participations = () => {
  return (
    <MyPartyPost>
      <ContentRow>
        <ContentItem>
          <b>스케이트 보드 배워보고 싶은신 분들!</b>
        </ContentItem>
        <ContentItem>
          <b>러닝 크루 모집해요</b>
        </ContentItem>
        <ContentItem>
          <b>롤 같이 하실 분!?</b>
        </ContentItem>
      </ContentRow>
      <ContentRow>
        <ContentItem>
          <b>스케이트 보드 배워보고 싶은신 분들!</b>
        </ContentItem>
        <ContentItem>
          <b>러닝 크루 모집해요</b>
        </ContentItem>
        <ContentItem>
          <b>롤 같이 하실 분!?</b>
        </ContentItem>
      </ContentRow>
      <ContentRow>
        <ContentItem>
          <b>스케이트 보드 배워보고 싶은신 분들!</b>
        </ContentItem>
        <ContentItem>
          <b>러닝 크루 모집해요</b>
        </ContentItem>
        <ContentItem>
          <b>롤 같이 하실 분!?</b>
        </ContentItem>
      </ContentRow>
    </MyPartyPost>
  );
};
export default Participations;
