import { styled } from 'styled-components';
import PropTypes from 'prop-types';

const ContentList = styled.ul`
  display: flex;
  list-style-type: none;
  width: 70vw;
  flex-wrap: wrap;
  margin-top: 20px;
`;

const ContentItem = styled.li`
  width: 16em;
  height: 16em;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 30px;
  margin-right: 30px;
  margin-bottom: 20px;

  img {
    width: 16em;
    height: 16em;
  }
`;

const Participations = ({ user, handleMovingBoard }) => {
  return (
    <ContentList>
      {user.applicants.map((el) => {
        return (
          <ContentItem
            key={el.boardId}
            onClick={() => handleMovingBoard(el.boardId)}
          >
            <img src={el.imgUrl} alt="my-party-list" />
          </ContentItem>
        );
      })}
    </ContentList>
  );
};

Participations.propTypes = {
  user: PropTypes.object.isRequired,
  handleMovingBoard: PropTypes.func.isRequired,
};

export default Participations;
