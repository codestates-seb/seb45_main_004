import { styled } from 'styled-components';
import PropTypes from 'prop-types';

const StyleButton = styled.button`
  /* 버튼 기본 스타일*/
  width: 100px;
  height: 42px;
  border-radius: 10px;
  font-size: 16px;
  cursor: pointer;

  /* 버튼 조건부 스타일 &.{btnType} 
  예) 카테고리 버튼 : &.Button-category
  */
  &.Button-membership {
    font-weight: 700;
    padding: 2px 10px;
    margin-left: 20px;
    background-color: rgba(246, 246, 246, 0);
  }

  &.Button-newCard {
    width: 110px;
    height: 42px;
    font-weight: 700;
    padding: 2px 10px;
    margin-left: 20px;
    background-color: rgba(246, 246, 246, 0);
  }

  &.Button-notification {
    width: 42px;
    background-color: rgba(246, 246, 246, 0);
    border: 0;
    font-size: 42px;
    text-align: center;
    padding: 0;
    margin-left: 20px;
  }
`;

const Button = ({ type, text, onClick }) => {
  const btnType = ['membership', 'newCard', 'notification'].includes(type)
    ? type
    : 'default';

  return (
    <StyleButton className={`Button-${btnType}`} onClick={onClick}>
      {text}
    </StyleButton>
  );
};

Button.defaultProps = {
  type: 'default',
};

Button.propTypes = {
  type: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Button;
