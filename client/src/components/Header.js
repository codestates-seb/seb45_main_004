import { styled } from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { FaRegUserCircle } from 'react-icons/fa';
// import { MdNotificationsActive, MdNotificationsNone } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../redux/actions';
import Button from './Button';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

const ServieceHeader = styled.header`
  /* 헤더 기본 스타일 */
  background-color: rgba(255, 255, 255, 0.2);
  height: 6em;
  width: 100%;
  /* 헤더의 요소 정렬 */
  .header-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    margin: 0 auto;
    max-width: 1260px; // 원하는 너비로 조절 가능
  }
  @media (max-width: 968px) {
    .header-container {
      padding: 0 40px; // 원하는 패딩 값을 조절할 수 있습니다.
    }
  }

  /* 브레이크 포인트: 768px */
  @media (max-width: 768px) {
    .header-container {
      padding: 0 40px; // 원하는 패딩 값을 조절할 수 있습니다.
    }
  }
  .button-box {
    display: flex;
    align-items: center;
    gap: 20px;
  }

  .user-info-icon {
    width: 42px;
    height: 42px;
    color: #000;
  }
  /* a태그 타이포그래피 스타일 삭제 */
  .title-box {
    h1 {
      margin: 0;
      font-size: 2.5rem;
      color: white;
    }
  }
`;

const ButtonBox = styled.div`
  gap: 20px;
`;

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.auth.isLogin);
  //const isNew = useSelector((state) => state.new.isNew);

  /*const handleNewStatus = () => {
    dispatch(newStatus(!isNew));
  };
  console.log(handleNewStatus);*/

  const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('refresh');
    dispatch(logout());
    navigate('/');
  };

  const handleWriteClick = () => {
    alert('모집날짜로부터 2일 전 모집이 마감됩니다.');
  };

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');

    if (token) {
      dispatch(login(token));
    }
  }, []);

  return (
    <ServieceHeader>
      <div className="header-container">
        <Link to="/" className="title-box">
          <h1>Celebee</h1>
        </Link>
        {isLogin ? (
          <ButtonBox>
            <div className="button-box">
              <Link to="/members/me" className="user-info-icon">
                <FaRegUserCircle className="user-info-icon" />
              </Link>
              <Link to="/boards/new-boards">
                <Button
                  type="based"
                  text="New Card!"
                  onClick={handleWriteClick}
                />
              </Link>
              {/* {isNew ? (
                <Button
                  type="notification"
                  text={<MdNotificationsActive className="noti-icon" />}
                />
              ) : (
                <Button
                  type="notification"
                  text={<MdNotificationsNone className="noti-icon" />}
                />
              )} */}
              <Button type="based" text="Logout" onClick={handleLogout} />
            </div>
          </ButtonBox>
        ) : (
          <ButtonBox>
            <div className="button-box">
              <Link to="/members/login">
                <Button type="based" text="Log In" />
              </Link>
              <Link to="/members">
                <Button type="based" text="Sign Up" />
              </Link>
            </div>
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
