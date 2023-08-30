import React from 'react'; // eslint-disable-line no-unused-vars
import { styled } from 'styled-components';
import PropTypes from 'prop-types';

const CatgegoryBtnWrapper = styled.li`
  button {
    width: 120px;
    height: 40px;
    background-color: white;
    border: none;
    border-radius: 20px;
    cursor: pointer;
  }
`;

export default function CategoryBtn({ text }) {
  return (
    <CatgegoryBtnWrapper>
      <button>{text}</button>
    </CatgegoryBtnWrapper>
  );
}

CategoryBtn.propTypes = {
  text: PropTypes.string.isRequired, // text prop의 유효성을 검사합니다.
};
