import { styled } from 'styled-components';
import PropTypes from 'prop-types';

const DibsOnPost = styled.div`
  display: flex;
  flex-direction: column;
`;

const ContentRow = styled.li`
  list-style-type: none;
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
  margin-bottom: 30px;
`;

const ContentItem = styled.div`
  width: 16em;
  height: 16em;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 45px;
  margin-right: 45px;
  margin-bottom: 20px;

  img {
    width: 16em;
    height: 16em;
  }
`;

const LikeIt = ({ user }) => {
  if (!user || !user.boardLikes || user.boardLikes.length === 0) {
    return null;
  }

  return (
    <DibsOnPost>
      <ContentRow>
        {user.boardLikes.map((el, boardId) => {
          return (
            <ContentItem key={boardId}>
              <img src={el.imgUrl} alt="찜한 목록" />;
            </ContentItem>
          );
        })}
      </ContentRow>
    </DibsOnPost>
  );
};

LikeIt.propTypes = {
  user: PropTypes.object.isRequired,
};

export default LikeIt;
