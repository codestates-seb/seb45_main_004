import { useState, useEffect } from 'react';
import axios from 'axios';
import { styled } from 'styled-components';
import CategoryBtn from '../components/CategoryBtn';
import CategoryMappings from '../components/CategoryMappings';
import { VscHeartFilled } from 'react-icons/vsc';
import { useParams, useNavigate } from 'react-router-dom';
import MapKakao from '../services/MapKakao';
import { differenceInDays, startOfDay } from 'date-fns';
import { useDispatch } from 'react-redux';
import { fetchUserData } from '../redux/actions';

function InvitePage() {
  const token = localStorage.getItem('jwtToken');
  const { boardId } = useParams();
  const navigate = useNavigate();
  const api = 'http://3.39.76.109:8080';
  const [participants, setParticipants] = useState([]);
  const memberId = localStorage.getItem('myId');
  const dispatch = useDispatch();
  const [showDropdown, setShowDropdown] = useState(false);
  // 드롭다운을 토글하는 함수
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  const handleContainerClick = (event) => {
    if (!event.target.classList.contains('dropdown-toggle')) {
      setShowDropdown(false);
    }
  };

  // 드롭다운 내부 요소의 클릭 이벤트 전파를 중단
  const handleDropdownClick = (event) => {
    event.stopPropagation();
  };

  // 카드 조회 요청 데이터 관리
  const [eventData, setEventData] = useState({
    memberId: '',
    title: '', // 카드의 제목
    date: '', // 카드의 날짜
    body: '', // 카드의 본문 내용
    category: '', // 카드의 카테고리
    currentNum: 0, // 현재 참여한 인원 수
    totalNum: 0, // 전체 참여 가능한 인원 수 //
    money: 0, // 카드의 금액 정보
    boardLikesCount: 0, // 카드에 대한 좋아요 수
    boardStatus: '', // 카드의 상태 (활성화, 비활성화 등)
    imageUrl: '', // 카드의 이미지
    member: {
      id: 0, // 멤버의 아이디
      memberNickname: '', // 멤버의 닉네임
      imageUrl: '', // 호스트의 이미지
    },
    address: '',
    longitude: '',
    latitude: '',
    isLiked: '',
  });
  //마감 날짜 관련
  const cardDate = startOfDay(new Date(eventData.date)); // 모임 날짜의 시작 시간
  const currentDate = startOfDay(new Date()); // 현재 날짜의 시작 시간
  // 두 날짜 간의 일수 차이 계산
  const daysDifference = differenceInDays(cardDate, currentDate);

  // 호스트 페이지 이동
  const hostPageClick = () => {
    const hostId = eventData.member.id;
    dispatch(fetchUserData(hostId));
    navigate(`/members/${eventData.member.id}`);
  };

  // 참여자 목록을 가져오는 함수
  const fetchParticipants = async () => {
    try {
      const response = await axios.get(`${api}/boards/${boardId}/join`);
      console.log(response.data);
      setParticipants(response.data); // 참여자 목록을 상태에 저장
      console.log(response);
    } catch (error) {
      console.error('Error fetching participants:', error);
    }
  };
  // 참여자 이미지 클릭 시 멤버 아이디를 리덕스 스토어에 저장
  const handleParticipantImageClick = (memberId) => {
    dispatch(fetchUserData(memberId)); // 멤버 아이디를 리덕스 스토어에 저장
    navigate(`/members/${memberId}`); // 유저 페이지로 이동
  };
  useEffect(() => {
    fetchParticipants(); // 참여자 목록 가져옴
  }, []);

  // 카드 조회 요청
  useEffect(() => {
    axios
      .get(`${api}/boards/${boardId}`)
      .then((response) => {
        const eventData = response.data;
        setEventData(eventData);
      })
      .catch((error) => {
        console.error('Error fetching event data:', error);
      });
  }, []);

  //참여요청
  const sendJoinStatus = () => {
    axios
      .request({
        method: 'post',
        url: `${api}/boards/${boardId}/join`,
        data: { isJoin: true },
        headers: {
          Authorization: token,
        },
      })
      .then(() => {
        // currentNum 값을 1 증가시킴
        setEventData((prevData) => ({
          ...prevData,
          currentNum: prevData.currentNum + 1,
        }));
        fetchParticipants(); // 참여자 목록을 다시 불러옴
      })
      .catch((error) => {
        console.error('Error sending join status:', error);
      });
  };

  const [isLiked, setIsLiked] = useState();

  useEffect(() => {
    axios
      .get(`${api}/members/${memberId}`)
      .then((response) => {
        const userLikedBoards = response.data.boardLikes;
        const liked = userLikedBoards.some(
          (board) => board.boardId === Number(boardId),
        );
        setIsLiked(liked);
      })
      .catch((error) => {
        console.error('에러 Error fetching member like status:', error);
      });
  }, []);

  const handleLikeClick = () => {
    const newLikeStatus = !isLiked;
    setIsLiked(newLikeStatus);
    sendLikeStatus(newLikeStatus);
  };

  const sendLikeStatus = (isLiked) => {
    axios
      .request({
        method: isLiked ? 'post' : 'delete', // isLiked 값에 따라 POST 또는 DELETE 요청을 함(true면 post(좋아요추가) false면 delete(좋아요취소))
        url: `${api}/likes/${boardId}`,
        data: { isLiked },
        headers: {
          Authorization: token,
        },
      })
      .then(() => {
        // 응답 받은 상태 업데이트
        setEventData((prevData) => ({
          ...prevData, // 기존의 eventData를 복사하여 새로운 객체를 생성
          boardLikesCount: isLiked
            ? prevData.boardLikesCount + 1
            : prevData.boardLikesCount - 1,
        }));
      })
      .catch((error) => {
        console.error('Error sending like status:', error);
      });
  };

  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

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
              <button
                className="heart-button"
                onClick={handleLikeClick}
              ></button>
              <VscHeartFilled className="heart-icon" />
              <div className="likes-count">
                <div>{eventData.boardLikesCount}</div>
              </div>
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
                    ...
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
            latitude={eventData.latitude}
            longitude={eventData.longitude}
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
  }
  .data,
  .main-img,
  #map {
    box-shadow: 4px 3px 10px rgba(0, 0, 0, 0.2);
  }

  .heart-button {
    position: absolute;
    background-color: transparent;
    top: 365px;
    left: 358px;
    width: 31px;
    height: 27px;
    border: none;
    cursor: pointer;
    z-index: 1;
  }
  .heart-icon {
    position: absolute;
    top: 360px;
    left: 355px;
    font-size: 38px;
    color: red;
  }
  .likes-count {
    text-align: center;
    position: absolute;
    color: whitesmoke;
    top: 368px;
    left: 371px;
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
    gap: 5px;
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
    box-shadow: 2px 2px 2px 2px rgb(0, 0, 0, 0.5);
    transform: translateY(1px);
    border-radius: 50px;
  }

  .host-img,
  .user-img {
    border-radius: 50px;
    width: 50px;
    height: 50px;
  }

  .user-img-offset {
    margin-left: -30px;
    width: 50px;
    height: 50px;
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
  /* 드롭다운 버튼 스타일 */
  .dropdown-toggle {
    height: 30px;
    width: 30px;
    border: none;
    border-radius: 5px;
    padding: 10px 5px;
    background-color: transparent;
    color: #fff;
    font-size: 20px;
    text-align: start;
    cursor: pointer;
  }

  .dropdown-toggle:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
  .dropdown-toggle:active {
    box-shadow: inset 1px 1px 1px rgb(0, 0, 0, 0.2);
  }
  /* 드롭다운 목록 스타일 */
  .dropdown {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: -80px;
    left: 30px;
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

    .likes-count {
      top: 397px;
      left: 406px;
    }
  }
`;

export default InvitePage;
