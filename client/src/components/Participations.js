import { styled } from 'styled-components';
import PropTypes from 'prop-types';

const MyPartyPost = styled.div`
  display: flex;
  flex-direction: column;
`;

const ContentRow = styled.li`
  list-style-type: none;
  display: flex;
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

  img {
    width: 16em;
    height: 16em;
  }
`;

const Participations = ({ user }) => {
  return (
    <MyPartyPost>
      <ContentRow>
        {user.applicants.map((el, id) => {
          return (
            <ContentItem key={id}>
              <img src={el.boardImageUrl} alt="my-party-list" />;
            </ContentItem>
          );
        })}
      </ContentRow>
    </MyPartyPost>
  );
};

Participations.propTypes = {
  user: PropTypes.object.isRequired,
};

export default Participations;
