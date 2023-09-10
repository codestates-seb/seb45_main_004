import React from 'react'; // eslint-disable-line no-unused-vars
import { styled } from 'styled-components';
import PropTypes from 'prop-types';

const CatgegoryBtnWrapper = styled.li`
  button {
    width: 140px; // 너비가 수정 부분
    height: 40px;
    background-color: ${(props) => props.color || 'white'};
    border: none;
    border-radius: 20px;
    cursor: pointer;
    padding: 0px;
    // 특정 버튼에만 마진값 안주기
    /* margin-right: ${(props) => (props.isETC ? '0px' : '20px')}; */

    // 버튼 그림자
    box-shadow: 1px 3px 4px rgb(0, 0, 0, 0.4);

    // InviteWritePage 버튼 클릭 상태에 따른 css
    box-shadow: ${(props) =>
      props.isSelected ? 'inset 1px 1px 4px 1px rgb(0, 0, 0, 0.5)' : ''};
  }
`;

export default function CategoryBtn({ text, color, onClick, isSelected }) {
  const handleClick = () => {
    // 클릭 이벤트 핸들러 실행 후, 부모 컴포넌트에서 전달한 onClick 함수 실행
    if (onClick) {
      onClick(text); // 클릭한 버튼의 텍스트 값을 부모 컴포넌트로 전달
    }
  };
  return (
    <CatgegoryBtnWrapper
      isSelected={isSelected}
      isETC={text === 'ETC'}
      color={color}
    >
      <button onClick={handleClick}>{text}</button>
    </CatgegoryBtnWrapper>
  );
}

CategoryBtn.propTypes = {
  text: PropTypes.string, // text prop의 유효성을 검사합니다.
  color: PropTypes.string,
  onClick: PropTypes.func,
  isSelected: PropTypes.bool,
};
