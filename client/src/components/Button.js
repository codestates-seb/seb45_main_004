import { styled } from 'styled-components';
import PropTypes from 'prop-types';

const StyleButton = styled.button`
  /* 버튼 기본 스타일.*/
  width: 120px;
  font-size: 16px;
  cursor: pointer;
  border: 1px solid;
  border-radius: 20px;
  /* 버튼 조건부 스타일 &.{btnType} 
  예) 카테고리 버튼 : &.Button-category
  */
  &.Button-based {
    height: 42px;
    font-weight: 700;
    background-color: rgba(246, 246, 246, 0);
  }

  &.Button-based:active {
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
  &.Button-login:active,
  &.Button-login:focus {
    box-shadow: inset 1px 1px 3px 1px rgb(0, 0, 0, 0.2); /* 클릭 또는 포커스 시 box-shadow를 추가합니다. */
  }

  &.Button-fill {
    width: 180px;
    height: 60px;
    background-color: ${(props) => (props.color ? props.color : 'default')};
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
  &.Button-fill:focus {
    box-shadow: inset 1px 1px 4px 1px rgb(0, 0, 0, 0.5);
  }

  &.Button-text {
    background-color: rgba(246, 246, 246, 0);
    border: none;
    border-radius: 0;
    font-weight: 600;
    font-size: 1.2rem;
    text-align: right;
    position: absolute;
    bottom: 2px;
    right: 10px;
    cursor: pointer;
  }

  @media (max-width: 768px) {
    &.Button-based {
      width: 80px;
      height: 35px;
      font-size: 0.8rem;
    }

    &.Button-text {
      font-size: 1rem;
      font-weight: 500;
    }

    &.Button-fill {
      font-size: 1rem;
      width: 150px;
      height: 55px;
    }
  }

  @media (max-width: 432px) {
    &.Button-based {
      width: 60px;
      height: 30px;
      font-size: 0.6rem;
    }

    &.Button-text {
      font-size: 0.6rem;
      font-weight: 500;
    }

    &.Button-fill {
      font-size: 0.6rem;
      width: 120px;
      height: 50px;
      margin-left: 20px;
      margin-right: 20px;
    }
  }
`;

const Button = ({ style, text, color, onClick }) => {
  const validStyle = ['based', 'newCard', 'fill', 'login', 'text'];
  const btnStyle = validStyle.includes(style) ? style : 'default';

  return (
    <StyleButton
      className={`Button-${btnStyle}`}
      color={color}
      onClick={onClick}
    >
      {text}
    </StyleButton>
  );
};

Button.defaultProps = {
  style: 'default',
  color: '',
};

Button.propTypes = {
  style: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default Button;
