import { useState, useEffect } from 'react';
import axios from 'axios';
import { styled } from 'styled-components';
import CategoryBtn from '../components/CategoryBtn';
import CategoryMappings from '../components/CategoryMappings';
import { VscHeartFilled } from 'react-icons/vsc';
import { useParams, useNavigate } from 'react-router-dom';
import MapKakao from '../services/MapKakao';
import { differenceInDays, startOfDay } from 'date-fns';

function InvitePage() {
  // 카드 조회 요청 데이터 관리
  const [eventData, setEventData] = useState({
    memberId: '',
    title: '',
    date: '',
    body: '',
    category: '',
    currentNum: 0,
    totalNum: 0,
    money: 0,
    boardLikesCount: 0,
    boardStatus: '',
    imageUrl: '',
    member: {
      id: 0, // 호스트 아이디
      memberNickname: '', // 호스트 닉네임
      imageUrl: '', // 호스트의 이미지
    },
    address: '',
    longitude: '',
    latitude: '',
    isLiked: '',
  });
  const token = localStorage.getItem('jwtToken');
  const memberId = localStorage.getItem('myId');
  const { boardId } = useParams();
  const navigate = useNavigate();
  const api = 'https://api.celebee.kro.kr';
  const [participants, setParticipants] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const cardDate = startOfDay(new Date(eventData.date)); // 모임 날짜의 시작 시간
  const currentDate = startOfDay(new Date()); // 현재 날짜의 시작 시간
  const daysDifference = differenceInDays(cardDate, currentDate); // 두 날짜 간의 일수 차이 계산
  const [isLiked, setIsLiked] = useState();
  const [userParticipation, setUserParticipation] = useState(false);
  // 카드 조회 요청
  const fetchEventData = async () => {
    try {
      const response = await axios.get(`${api}/boards/${boardId}`);
      const eventData = response.data;
      setEventData(eventData);
    } catch (error) {
      console.error('Error fetching event data:', error);
    }
  };

  //참여 요청
  const sendJoinStatus = async () => {
    try {
      await axios.request({
        method: 'post',
        url: `${api}/boards/${boardId}/join`,
        data: { isJoin: true },
        headers: {
          Authorization: token,
        },
      });
      setEventData((prevData) => ({
        ...prevData,
        currentNum: prevData.currentNum + 1,
      }));
      fetchParticipants(); // 참여자 목록을 다시 불러옴
    } catch (error) {
      alert('로그인 후 이용해주세요.');
      console.error('Error sending join status:', error);
    }
  };

  // 좋아요 요청
  const sendLikeStatus = async (isLiked) => {
    try {
      await axios.request({
        method: isLiked ? 'post' : 'delete',
        url: `${api}/likes/${boardId}`,
        data: { isLiked },
        headers: {
          Authorization: token,
        },
      });
      // 응답 받은 상태 업데이트
      setEventData((prevData) => ({
        ...prevData,
        boardLikesCount: isLiked
          ? prevData.boardLikesCount + 1
          : prevData.boardLikesCount - 1,
      }));
    } catch (error) {
      console.error('Error sending like status:', error);
    }
  };

  // 참여자 목록
  const fetchParticipants = async () => {
    try {
      const response = await axios.get(`${api}/boards/${boardId}/join`);
      setParticipants(response.data);

      // 참여 여부를 확인하여 상태 업데이트
      const userParticipation = response.data.some(
        (participant) => String(participant.memberId) === String(memberId),
      );
      setUserParticipation(userParticipation);
    } catch (error) {
      console.error('Error fetching participants:', error);
    }
  };

  // 좋아요 목록
  const fetchIsLikedStatus = async () => {
    try {
      const response = await axios.get(`${api}/members/${memberId}`);
      const userLikedBoards = response.data.boardLikes;
      const liked = userLikedBoards.some(
        (board) => board.boardId === Number(boardId),
      );
      setIsLiked(liked);
    } catch (error) {
      console.error('Error fetching member like status:', error);
    }
  };

  // 좋아요 상태
  const handleLikeClick = () => {
    if (!token) {
      // 토큰이 없다면 로그인되어 있지 않다는 메시지를 표시
      alert('로그인 후 찜 기능을 사용할 수 있습니다.');
      return;
    }

    const newLikeStatus = !isLiked;
    setIsLiked(newLikeStatus);
    sendLikeStatus(newLikeStatus);
  };

  // 호스트 페이지 이동
  const hostPageClick = () => {
    const hostId = eventData.member.id;
    localStorage.setItem('clickedUserId', hostId);
    const clickedUserId = localStorage.getItem('clickedUserId');
    if (memberId === clickedUserId) {
      navigate(`/members/me`);
    } else {
      navigate(`/members/${clickedUserId}`);
    }
  };

  // 참여자 페이지 이동
  const handleParticipantImageClick = (memberId) => {
    localStorage.setItem('clickedUserId', memberId);
    const clickedUserId = localStorage.getItem('clickedUserId');
    const myId = localStorage.getItem('myId');
    if (clickedUserId === myId) {
      navigate(`/members/me`);
    } else {
      navigate(`/members/${memberId}`); // 유저 페이지로 이동
    }
  };

  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  // 드롭다운을 토글하는 함수
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleContainerClick = (event) => {
    if (!event.target.classList.contains('more-box')) {
      setShowDropdown(false);
    }
  };

  // 드롭다운 내부 요소의 클릭 이벤트 전파를 중단
  const handleDropdownClick = (event) => {
    event.stopPropagation();
  };

  // 참여자 목록
  useEffect(() => {
    fetchParticipants();
  }, []);
  // 카드 조회
  useEffect(() => {
    fetchEventData();
  }, []);
  // 좋아요 목록
  useEffect(() => {
    fetchIsLikedStatus();
  }, []);

  return (
    <EventDetailsContainer onClick={handleContainerClick}>
      <section>
        <article>
          <div className="card-container">
            <div className="image-container">
              <img
                className="main-img"
                src={eventData.imageUrl}
                alt="카드 이미지"
              />
              <button className="heart-button" onClick={handleLikeClick}>
                {isLiked ? (
                  <VscHeartFilled className="heart-icon-red" />
                ) : (
                  <VscHeartFilled className="heart-icon" />
                )}
                <div className="likes-count">
                  <div>{eventData.boardLikesCount}</div>
                </div>
              </button>
            </div>
          </div>
          <div className="user-box">
            <div className="host-container">
              <div className="host-box">
                <button className="host-btn" onClick={hostPageClick}>
                  <img
                    className="host-img" // 호스트 이미지 표시
                    src={eventData.member.imageUrl}
                    alt="host-img"
                  />
                </button>
                <div>금액: {numberWithCommas(eventData.money)}</div>
              </div>
              <button
                className="join-btn"
                onClick={sendJoinStatus}
                // 참여버튼 비활성화
                disabled={
                  eventData.currentNum === eventData.totalNum ||
                  (daysDifference >= 0 && daysDifference <= 2)
                }
                style={{
                  display:
                    memberId === String(eventData.member.id) ||
                    userParticipation
                      ? 'none'
                      : 'block',
                }}
              >
                {eventData.currentNum === eventData.totalNum ||
                (daysDifference >= 0 && daysDifference <= 2)
                  ? 'Closed'
                  : 'Participation'}
              </button>
            </div>
            <div className="user-container">
              {/* 참여자 표시 */}
              {participants.slice(0, 5).map((participant, index) => (
                <button
                  className={`user-btn ${index !== 0 ? 'user-img-offset' : ''}`}
                  key={index}
                  onClick={() => {
                    handleParticipantImageClick(participant.memberId);
                  }}
                >
                  <img
                    className="user-img"
                    src={participant.memberImageUrl}
                    alt="user-img"
                  />
                </button>
              ))}
              {/* 추가: 드롭다운 토글 버튼 */}
              <div className="dropdown-container">
                {participants.length > 1 && ( // ... 버튼 2명 부터 나오게하기
                  <button className="dropdown-toggle" onClick={toggleDropdown}>
                    <div className="more-box">...more</div>
                  </button>
                )}
                {/* 드롭다운으로 표시되는 참여자 목록 */}
                {showDropdown && (
                  <div
                    className="dropdown"
                    onClick={handleDropdownClick}
                    onKeyDown={handleDropdownClick}
                    role="button"
                    tabIndex="0"
                  >
                    {participants.slice(0).map((participant, index) => (
                      <div className="participation-data" key={index}>
                        <button
                          className="user-btn"
                          key={index + 1}
                          onClick={() => {
                            handleParticipantImageClick(participant.memberId);
                          }}
                        >
                          <img
                            className="user-img"
                            src={participant.memberImageUrl}
                            alt="user-img"
                          />
                        </button>
                        <span className="nickname-box">
                          {participant.memberNickname}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {/* 참여자 수 표시 */}
              <div>
                {eventData.currentNum}/{eventData.totalNum}
              </div>
            </div>
          </div>
        </article>

        <article className="form-box">
          <div className="data title-box">
            <h1>{eventData.title}</h1>
          </div>
          <div className="data title-date">
            <div>{eventData.date}</div>
          </div>
          <div className="data title-body">
            <div>{eventData.body}</div>
          </div>
          <div>
            {Object.keys(CategoryMappings).map((key) => {
              if (eventData.category === key) {
                return (
                  <CategoryBtn
                    key={key}
                    text={CategoryMappings[key]?.label}
                    color={CategoryMappings[key]?.backgroundColor}
                  />
                );
              }
              return null;
            })}
          </div>
          <MapKakao
            latitude={parseFloat(eventData.latitude)}
            longitude={parseFloat(eventData.longitude)}
            showSearch={false}
            showMarker={true}
          />
        </article>
      </section>
    </EventDetailsContainer>
  );
}

const EventDetailsContainer = styled.div`
  margin: 0px 320px;
  display: flex;
  justify-content: center;
  color: black;
  section {
    margin: 50px 0px;
    display: flex;
    padding: 0px 200px;

    @media (max-width: 768px) {
      flex-direction: column;
      padding: 0px 10px;
    }
  }

  article {
    width: 433px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .main-img {
    width: 400px;
    height: 400px;
  }

  .image-container {
    position: relative;
    width: 400px;
    height: 400px;
  }

  .heart-button {
    position: absolute;
    background-color: transparent;
    width: 31px;
    height: 27px;
    border: none;
    cursor: pointer;
    right: 10px;
    bottom: 10px;
  }
  .heart-icon,
  .heart-icon-red {
    font-size: 38px;
  }

  .heart-icon {
    color: gainsboro;
  }

  .heart-icon-red {
    color: red;
  }

  .likes-count {
    position: absolute;
    top: 20px;
    left: 20px;
    transform: translate(-50%, -50%);
    text-align: center;
    font-size: 16px;
  }

  .host-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 5px;
    width: 400px;
    height: 50px;
  }
  .host-box {
    display: flex;
    align-items: center;
    gap: 30px;
  }
  .user-box {
    display: flex;
    flex-direction: column;
    gap: 30px;
    margin-top: 10px;
  }

  .user-container {
    display: flex;
    align-items: flex-end;
    gap: 8px;
    height: 50px;
  }

  .user-btn,
  .host-btn {
    background-color: transparent;
    cursor: pointer;
    border: none;
    width: 50px;
    height: 50px;
  }
  .user-btn:active,
  .host-btn:active {
    transform: translateY(2px);
    border-radius: 50px;
  }

  .host-img,
  .user-img {
    border-radius: 50px;
    width: 50px;
    height: 50px;
    box-shadow: 2px 2px 2px 2px rgb(0, 0, 0, 0.2);
  }

  .user-img-offset {
    margin-left: -30px;
    width: 50px;
    height: 50px;
  }

  .data,
  .main-img,
  #map {
    box-shadow: 3px 2px 10px rgba(0, 0, 0, 0.2);
  }

  .participation-data {
    display: flex;
    align-items: center;
    width: 200px;
  }

  .nickname-box {
    margin-left: 10px;
    width: 100%;
  }

  .dropdown-container {
    position: relative;
  }
  .dropdown-toggle {
    border: none;
    background-color: transparent;
    border-radius: 5px;
    color: #333;
    font-size: 20px;
    text-align: start;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  .dropdown-toggle:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
  .dropdown-toggle:active {
    transform: scale(0.95);
  }

  .more-box {
    font-size: 16px;
    color: #000;
  }
  /* 드롭다운 목록 스타일 */
  .dropdown {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: -170px;
    left: 60px;
    width: 200px;
    height: 200px;
    padding: 20px 20px 20px 20px;
    gap: 12px;
    overflow: scroll;
    background-color: rgba(255, 255, 255, 0.9);
    border-radius: 20px;
  }
  /* 스크롤바 높낮이 */
  .dropdown::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  /* 수직 스크롤바 슬라이더 (막대) */
  .dropdown::-webkit-scrollbar-thumb {
    background-color: #999;
    border-radius: 10px;
  }

  /* 수평 스크롤바의 끝 부분 코너 */
  .dropdown::-webkit-scrollbar-corner {
    border-radius: 10px;
  }

  /* 스크롤바 위 여백 */
  .dropdown::-webkit-scrollbar-button:start {
    display: block;
    height: 10px; /* 위 여백 높이 조절 */
  }

  /* 스크롤바 아래 여백 */
  .dropdown::-webkit-scrollbar-button:end {
    display: block;
    height: 2px; /* 아래 여백 높이 조절 */
  }

  .title-box {
    background-color: white;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(244, 227, 233, 0.4);
    border: none;
  }
  .title-date {
    background-color: white;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(244, 227, 233, 0.4);
    border: none;
  }

  .title-body {
    background-color: white;
    height: 300px;
    overflow: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(244, 227, 233, 0.4);
    border: none;
    margin-bottom: 23px;
  }
  .map-box {
    height: 300px;
    border: 1px solid;
  }

  .date-box {
    display: flex;
    gap: 10px;
  }

  input,
  textarea {
    width: 100%;
    padding: 10px;
  }

  label {
    width: 100%;
  }

  .search-box {
    display: flex;
  }
  #address-input {
    height: 30px;
    flex: 1;
  }

  .submit-btn {
    width: 100%;
  }

  .join-btn {
    height: 40px;
    border: none;
    padding: 0px 12px;
    font-size: 14px;
    background-color: rgba(244, 227, 233, 0.4);
    cursor: pointer;
  }

  .join-btn:active {
    box-shadow: inset 1px 1px 3px rgb(0, 0, 0, 0.4);
  }

  .join-btn[disabled] {
    cursor: not-allowed;
  }

  .join-btn:disabled:active {
    box-shadow: none;
  }

  #map {
    margin-top: 10px;
  }

  @media (max-width: 768px) {
    img {
      width: 100%;
      height: auto;
    }

    .user-box {
      flex-direction: column;

      justify-content: space-between;
      margin-top: 10px;
    }

    .host-container {
      width: 100%;
    }

    .form-box {
      margin-top: 20px;
    }
    .main-img {
      width: 100%;
      height: 100%;
    }

    .heart-icon {
      top: 390px;
      left: 390px;
    }
  }
`;

export default InvitePage;
