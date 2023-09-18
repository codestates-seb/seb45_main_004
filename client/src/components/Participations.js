import { styled } from 'styled-components';
import PropTypes from 'prop-types';

const ContentList = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-content: center;
  list-style-type: none;
  flex-wrap: wrap;
  margin-top: 20px;
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
