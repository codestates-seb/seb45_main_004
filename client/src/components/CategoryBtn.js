import React from 'react'; // eslint-disable-line no-unused-vars
import { styled } from 'styled-components';
import PropTypes from 'prop-types';

const CatgegoryBtnWrapper = styled.li`
  button {
    width: 120px;
    height: 40px;
    background-color: ${(props) => props.color || 'white'};
    border: none;
    border-radius: 20px;
    cursor: pointer;
    padding: 0px;
    // 특정 버튼에만 마진값 안주기
    margin-right: ${(props) => (props.isETC ? '0px' : '20px')};
  }
`;

export default function CategoryBtn({ text, color }) {
  return (
    <CatgegoryBtnWrapper isETC={text === 'ETC'} color={color}>
      <button>{text}</button>
    </CatgegoryBtnWrapper>
  );
}

CategoryBtn.propTypes = {
  text: PropTypes.string.isRequired, // text prop의 유효성을 검사합니다.
  color: PropTypes.string.isRequired,
};
