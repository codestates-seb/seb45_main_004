import PropTypes from 'prop-types';
import { styled } from 'styled-components';
import Button from './Button';
import { FaRegUserCircle } from 'react-icons/fa';
import { MdNotificationsActive, MdNotificationsNone } from 'react-icons/md';
import { useState } from 'react';

const ServieceHeader = styled.header`
  /* 헤더 기본 스타일 */
  width: 100%;
  background-color: rgba(255, 255, 255, 0.2);
  height: 6em;

  /* 헤더의 요소 정렬 */
  .header-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 80%;
    height: 100%;
    margin-left: 10%;
    margin-right: 10%;
  }

  /* a태그 타이포그래피 스타일 삭제 */
  .title-box {
    text-decoration: none;
    /* 서비스명 글자크기 변경 */
    h1 {
      margin: 0;
      font-size: 2.5rem;
      color: white;
    }
  }
`;

const ButtonBox = styled.div`
  display: flex;

  .user-info-icon {
    width: 42px;
    height: 42px;
    color: black;
    margin-left: 20px;
  }
`;

const LinkBox = styled.a`
  height: 42px;
`;

const Header = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [isNew, setIsNew] = useState(false);
  console.log(setIsLogin, isNew, setIsNew);

  return (
    <ServieceHeader>
      <div className="header-container">
        <LinkBox href="/" className="title-box">
          <h1>Celebee</h1>
        </LinkBox>
        {isLogin ? (
          <ButtonBox>
            <LinkBox href="/cards/new-cards">
              <Button
                type="newCard"
                text="New Card!"
                onClick={() => alert('게시글 작성 페이지로 이동')}
              />
            </LinkBox>
            {isNew ? (
              <Button
                type="notification"
                text={<MdNotificationsActive className="noti-icon" />}
              />
            ) : (
              <Button
                type="notification"
                text={<MdNotificationsNone className="noti-icon" />}
              />
            )}

            <LinkBox href="/members/{member-id}" className="user-info">
              <FaRegUserCircle className="user-info-icon" />
            </LinkBox>
          </ButtonBox>
        ) : (
          <ButtonBox>
            <LinkBox href="/boards/new-boards">
              <Button type="membership" text="New Card" />
            </LinkBox>
            <LinkBox href="/login">
              <Button
                type="membership"
                text="Log In"
                onClick={() => alert('로그인 페이지로 이동')}
              />
            </LinkBox>
            <LinkBox href="/users/new-user">
              <Button
                type="membership"
                text="Sign Up"
                onClick={() => alert('회원가입 페이지로 이동')}
              />
            </LinkBox>
          </ButtonBox>
        )}
      </div>
    </ServieceHeader>
  );
};

Header.propTypes = {
  isLogin: PropTypes.bool.isRequired,
  setIsLogin: PropTypes.func.isRequired,
};

export default Header;
