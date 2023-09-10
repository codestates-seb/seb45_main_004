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
  const token = localStorage.getItem('jwtToken');
  const { boardId } = useParams();
  const navigate = useNavigate();
  const api = 'http://3.39.76.109:8080';

  // 카드 조회 요청 데이터 관리
  const [eventData, setEventData] = useState({
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
      memberId: 0, // 멤버의 아이디
      memberNickname: '', // 멤버의 닉네임
      imageUrl: '', // 호스트의 이미지
    },
    address: '',
    longitude: '',
    latitude: '',
    isLiked: '',
  });
  const [participants, setParticipants] = useState([]);

  const hostPageClick = () => {
    const memberId = eventData.member.id;
    navigate(`/members/${memberId}`);
  };

  // 참여자 목록을 가져오는 함수
  const fetchParticipants = async () => {
    try {
      const response = await axios.get(`${api}/boards/${boardId}/join`);
      setParticipants(response.data); // 참여자 목록을 상태에 저장
    } catch (error) {
      console.error('Error fetching participants:', error);
    }
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

  // 좋아요 버튼을 클릭했을 때 호출
  const handleLikeClick = () => {
    const newIsLiked = !eventData.isLiked; // 현재 좋아요 상태 반전하여 새로운 상태 저장
    // 서버에 좋아요 상태 전송 함수 호출
    // console.log(newIsLiked);
    sendLikeStatus(newIsLiked);
  };

  // 서버로 좋아요 상태 전송 post또는 delete요청을 함
  const sendLikeStatus = (isLiked) => {
    // 서버로 좋아요 상태 전송
    axios
      .request({
        method: isLiked ? 'post' : 'delete', // isLiked 값에 따라 POST 또는 DELETE 요청을 함(true면 post(좋아요추가) false면 delete(좋아요취소))
        url: `${api}/likes/${boardId}`,
        data: { isLiked }, // isLiked 상태값을 서버에 요청값으로 보내줌
        headers: {
          Authorization: token,
        },
      })

      .then(() => {
        // 응답 받은 상태 업데이트
        setEventData((prevData) => ({
          //prevData는 이전  상태의 eventData 객체를 가리키는 변수임
          ...prevData, // 기존의 eventData를 복사하여 새로운 객체를 생성
          isLiked: isLiked, // 새로운 객체에 새로운 좋아요 상태 값을 업데이트
          boardLikesCount: isLiked // 좋아요 추가 시 좋아요 전체 카운트를 증가 또는 감소함
            ? prevData.boardLikesCount + 1
            : prevData.boardLikesCount - 1,
        }));
        // console.log(isLiked);
      })
      .catch((error) => {
        console.error('Error sending like status:', error);
      });
  };

  //마감 날짜 관련
  const cardDate = startOfDay(new Date(eventData.date)); // 모임 날짜의 시작 시간
  const currentDate = startOfDay(new Date()); // 현재 날짜의 시작 시간
  // 두 날짜 간의 일수 차이 계산
  const daysDifference = differenceInDays(cardDate, currentDate);

  return (
    <EventDetailsContainer>
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
              <div className="likes-count">{eventData.boardLikesCount}</div>
            </div>
          </div>
          <div className="user-box">
            <div className="host-container">
              <button className="host-btn" onClick={hostPageClick}>
                <img
                  className="host-img" // 호스트 이미지 표시
                  src={eventData.member.imageUrl}
                  alt="host-img"
                />
              </button>
              <div>금액: {eventData.money}</div>
            </div>
            <div className="user-container">
              {/* 참여자 표시 */}
              {participants.slice(0, 4).map((participant, index) => (
                <img
                  className={`user-img ${index !== 0 ? 'user-img-offset' : ''}`}
                  key={index}
                  src={participant.memberImageUrl}
                  alt="user-img"
                />
              ))}
              {participants.length > 3 && <span>...</span>}
              <div>
                {eventData.currentNum}/{eventData.totalNum}
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
                  : 'Join'}
              </button>
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

  section {
    margin: 50px 0px;
    display: flex;
    padding: 0px 200px;

    @media (max-width: 768px) {
      flex-direction: column;
      padding: 0px 10px;
    }
  }

  @keyframes stampEffect {
    0% {
      transform: scale(0.5);
      opacity: 0;
    }
    50% {
      transform: scale(1.1);
      opacity: 0.7;
    }
    100% {
      transform: scale(1);
      opacity: 1;
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
    top: 369px;
    left: 370px;
  }

  .user-box {
    display: flex;
    flex-direction: column;
    gap: 30px;
    margin-top: 20px;
  }

  .host-container {
    display: flex;
    align-items: center;
    gap: 5px;
    width: 100%;
    height: 50px;
  }

  .user-container {
    display: flex;
    align-items: center;
    gap: 5px;
    width: 100%;
  }

  .host-img,
  .user-img {
    border-radius: 50px;
    width: 50px;
    height: 50px;
  }

  .user-img-offset {
    margin-left: -30px;
  }

  .host-btn {
    cursor: pointer;
    border: none;
    height: 50px;
    padding: 0px;
    background-color: transparent;
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
    height: 200px;
    overflow: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(244, 227, 233, 0.4);
    border: none;
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
    height: 32px;
    border: none;
    padding: 0px 12px;
    background-color: rgba(244, 227, 233, 0.4);
  }

  .join-btn:active {
    transform: translateY(1px); // 클릭 시 버튼을 아래로 2px 이동
    box-shadow: 1px 1px rgb(0, 0, 0, 0.7);
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
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      margin-top: 10px;
    }

    .form-box {
      margin-top: 20px;
    }
  }
`;

export default InvitePage;
