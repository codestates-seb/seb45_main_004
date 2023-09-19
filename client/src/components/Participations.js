import { styled } from 'styled-components';
import PropTypes from 'prop-types';

const ContentList = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-content: center;
  list-style-type: none;
  place-items: center;
  margin-top: 20px;
  width: 100%;

  @media screen and (max-width: 768px) {
    margin: 20px 20px;
    display: flex;
    justify-content: center;
  }

  @media screen and (min-width: 769px) and (max-width: 1000px) {
    grid-template-columns: repeat(2, 1fr);
    place-items: center;
  }
`;

const ContentItem = styled.li`
  width: 18.7em;
  height: 18.7em;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 30px;
  margin-right: 30px;
  margin-bottom: 20px;

  img {
    width: 18.7em;
    height: 18.7em;
    cursor: pointer;
  }
`;

const Participations = ({ myData, memberData, handleMovingBoard }) => {
  return (
    <ContentList>
      {memberData
        ? memberData.applicants.map((el) => {
            return (
              <ContentItem
                key={el.boardId}
                onClick={() => handleMovingBoard(el.boardId)}
              >
                <img src={el.imgUrl} alt="찜한 목록" />
              </ContentItem>
            );
          })
        : myData.applicants.map((el) => {
            return (
              <ContentItem
                key={el.boardId}
                onClick={() => handleMovingBoard(el.boardId)}
              >
                <img src={el.imgUrl} alt="찜한 목록" />
              </ContentItem>
            );
          })}
    </ContentList>
  );
};

Participations.propTypes = {
  myData: PropTypes.object.isRequired,
  memberData: PropTypes.object.isRequired,
  handleMovingBoard: PropTypes.func.isRequired,
};

export default Participations;
