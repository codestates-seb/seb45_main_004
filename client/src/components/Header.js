import { styled } from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { FaRegUserCircle } from 'react-icons/fa';
// import { MdNotificationsActive, MdNotificationsNone } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../redux/actions';
import Button from './Button';
import { useEffect } from 'react';

const ServieceHeader = styled.header`
  /* 헤더 기본 스타일 */
  background-color: rgba(255, 255, 255, 0.2);
  width: 100%;
  padding: 10px 0;
  /* 헤더의 요소 정렬 */
  .header-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    margin: 0 auto;
    max-width: 1280px;
    padding: 0 30px;
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

  @media (max-width: 768px) {
    .header-container {
      padding: 0 20px;
    }

    .title-box {
      h1 {
        font-size: 1.7rem;
      }
    }

    .button-box {
      display: flex;
      align-items: center;
      gap: 0.5em;
    }

    .user-info-icon {
      width: 35px;
      height: 35px;
      color: #000;
    }
  }

  @media (max-width: 432px) {
    .header-container {
      padding: 0 15px;
    }

    .title-box {
      h1 {
        font-size: 1.5rem;
      }
    }

    .button-box {
      display: flex;
      align-items: center;
      gap: 0.5em;
    }

    .user-info-icon {
      width: 30px;
      height: 30px;
      color: #000;
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
    localStorage.removeItem('clickedUserId');
    localStorage.removeItem('myId');
    dispatch(logout());
    navigate('/');
  };

  const handleWriteClick = () => {
    alert('모임 날짜로부터 2일 전 모집이 마감됩니다.');
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
                  style="based"
                  text="New Card!"
                  onClick={handleWriteClick}
                />
              </Link>
              {/* {isNew ? (
                <Button
                  style="notification"
                  text={<MdNotificationsActive className="noti-icon" />}
                />
              ) : (
                <Button
                  style="notification"
                  text={<MdNotificationsNone className="noti-icon" />}
                />
              )} */}
              <Button style="based" text="Logout" onClick={handleLogout} />
            </div>
          </ButtonBox>
        ) : (
          <ButtonBox>
            <div className="button-box">
              <Link to="/members/login">
                <Button style="based" text="Log In" />
              </Link>
              <Link to="/members">
                <Button style="based" text="Sign Up" />
              </Link>
            </div>
          </ButtonBox>
        )}
      </div>
    </ServieceHeader>
  );
};

export default Header;
