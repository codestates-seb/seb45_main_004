import { styled } from 'styled-components';
import PropTypes from 'prop-types';

const StyleButton = styled.button`
  /* 버튼 기본 스타일*/
  width: 120px;
  font-size: 16px;
  cursor: pointer;
  border: 1px solid;
  border-radius: 20px;
  /* 버튼 조건부 스타일 &.{btnType} 
  예) 카테고리 버튼 : &.Button-category
  */

  &.Button-membership:active {
    transform: translateY(1px); // 클릭 시 버튼을 아래로 2px 이동
    box-shadow: inset 1px 1px 1px rgb(0, 0, 0, 0.7);
  }

  &.Button-login {
    width: 340px;
    height: 50px;
    border: 0;
    color: white;
    font-weight: 500;
    background-color: rgb(10, 149, 255);
    margin-bottom: 10px;
    box-shadow: 1px 3px 4px rgb(0, 0, 0, 0.4);
  }

  &.Button-based {
    height: 42px;
    font-weight: 700;
    background-color: rgba(246, 246, 246, 0);
  }

  &.Button-like {
    width: 180px;
    height: 60px;
    background-color: #ff6ac6;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    padding: 0px;
    margin-left: 30px;
    margin-right: 30px;
    color: white;
    font-size: 1.2rem;
    box-shadow: 1px 3px 4px rgb(0, 0, 0, 0.4);
  }

  &.Button-like:focus {
    box-shadow: inset 1px 1px 4px 1px rgb(0, 0, 0, 0.5);
  }

  &.Button-participations {
    width: 180px;
    height: 60px;
    background-color: #ffa472;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    padding: 0px;
    margin-left: 30px;
    margin-right: 30px;
    color: white;
    font-size: 1.2rem;
    box-shadow: 1px 3px 4px rgb(0, 0, 0, 0.4);
  }
  &.Button-participations:focus {
    box-shadow: inset 1px 1px 4px 1px rgb(0, 0, 0, 0.5);
  }

  &.Button-text {
    background-color: rgba(246, 246, 246, 0);
    border: none;
    color: ${(props) => (props ? props.color : 'default')};
    border-radius: 0;
    font-weight: 600;
    font-size: 1.2rem;
    text-align: right;
    position: absolute;
    bottom: 1px;
    right: 10px;
    cursor: pointer;
  }
`;

const Button = ({ type, text, onClick }) => {
  const btnType = [
    'based',
    'newCard',
    'like',
    'participations',
    'login',
    'text',
  ].includes(type)
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
  onClick: PropTypes.func,
};

export default Button;
