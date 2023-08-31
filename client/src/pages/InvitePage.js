import { useState, useEffect } from 'react';
import axios from 'axios';
import { styled } from 'styled-components';
import CategoryBtn from '../components/CategoryBtn';
import categoryMappings from '../components/CategoryMappings';
import { VscHeartFilled } from 'react-icons/vsc';

function InvitePage() {
  // 카드 데이터 상태변수
  const [eventData, setEventData] = useState({
    title: '', // 카드의 제목
    date: '', // 카드의 날짜
    body: '', // 카드의 본문 내용
    category: '', // 카드의 카테고리
    currentPerson: 0, // 현재 참여한 인원 수
    totalPerson: 0, // 전체 참여 가능한 인원 수
    money: 0, // 카드의 금액 정보
    boardLikesCount: 0, // 카드에 대한 좋아요 수
    boardStatus: '', // 카드의 상태 (활성화, 비활성화 등)
    member: {
      memberId: 0, // 멤버의 아이디
      memberNickname: '', // 멤버의 닉네임
      imageUrl: null,
    },
  });

  useEffect(() => {
    const boardId = '7'; // 예시로 아이디값 지정 (카드생성 페이지 구현 완료시 응답값에서 받아올 것)

    axios
      .get(`http://3.39.76.109:8080/boards/${boardId}`)
      .then((response) => {
        const eventData = response.data; // API 응답 데이터를 가져옴
        console.log(eventData);
        setEventData(eventData);
      })
      .catch((error) => {
        console.error('Error fetching event data:', error);
      });
  }, []);

  // 좋아요 버튼을 클릭했을 때 호출
  const handleLikeClick = () => {
    const newIsLiked = !eventData.isLiked; // 현재 좋아요 상태 반전하여 새로운 상태 저장

    // 서버에 좋아요 상태 전송 함수 호출
    sendLikeStatus(newIsLiked);
  };

  // 서버로 좋아요 상태 전송 post또는 delete요청을 함
  const sendLikeStatus = (isLiked) => {
    const token =
      'Bearer eyJhbGciOiJIUzM4NCJ9.eyJyb2xlcyI6WyJVU0VSIl0sIm5pY2tuYW1lIjoi7ZWY66Oo7IK07J20IiwiaWQiOjEsImVtYWlsIjoiT25lZGF5QGdtYWlsLmNvbSIsInN1YiI6Ik9uZWRheUBnbWFpbC5jb20iLCJpYXQiOjE2OTM0Njg3NTgsImV4cCI6MTY5Mzc2ODc1OH0.Inn_duS30xQbTvC6s5VF5Kd1uM4eauq8LDDBiwpOqCQjmaFo1zLkC9GIwGZXaY1E'; // 로그인 구현 전이라서 임시로 토큰값 넣어줌
    const boardId = '7'; // 카드생성페이지 구현전이라 카드 id값 임시로 넣어줌

    // 서버로 좋아요 상태 전송
    axios
      .request({
        method: isLiked ? 'post' : 'delete', // isLiked 값에 따라 POST 또는 DELETE 요청을 함(true면 post(좋아요추가) false면 delete(좋아요취소))
        url: `http://3.39.76.109:8080/likes/${boardId}`,
        data: { isLiked }, // isLiked 상태값을 서버에 요청값으로 보내줌
        headers: {
          Authorization: token,
        },
      })

      .then((response) => {
        console.log(response.data);
        // 응답 받은 상태 업데이트
        setEventData((prevData) => ({
          //prevData는 이전 상태의 eventData 객체를 가리키는 변수임
          ...prevData, // 기존의 eventData를 복사하여 새로운 객체를 생성
          isLiked: isLiked, // 새로운 객체에 새로운 좋아요 상태 값을 업데이트
          boardLikesCount: isLiked // 좋아요 추가 시 좋아요 전체 카운트를 증가 또는 감소함
            ? prevData.boardLikesCount + 1
            : prevData.boardLikesCount - 1,
        }));
      })
      .catch((error) => {
        console.error('Error sending like status:', error);
      });
  };

  return (
    <EventDetailsContainer>
      <section>
        <article>
          <div className="card-container">
            <div className="image-container">
              <img
                src="https://cdn-bastani.stunning.kr/prod/portfolios/8735ec14-dccc-4ccd-92b8-cc559ac33bb2/contents/xcxZTwt6usiPmKNA.Mobile_Whale_World%202.jpg"
                alt="cardImage"
              />
              {/* <div>{clickCount}</div> */}
              <button className="heart-button" onClick={handleLikeClick}>
                <VscHeartFilled className="heart-icon" />
              </button>
              <div className="likes-count">{eventData.boardLikesCount}</div>
            </div>
            <button>카카오 공유버튼</button>
          </div>
          <div className="host-container">
            <button className="host-btn">
              <img
                className="host-img" // 유저이미지 표시
                src="https://cdn-bastani.stunning.kr/prod/portfolios/8735ec14-dccc-4ccd-92b8-cc559ac33bb2/contents/xcxZTwt6usiPmKNA.Mobile_Whale_World%202.jpg"
                /*{멤버id로 받아올 호스트 이미지}*/ alt="hostImage"
              />
            </button>
            <div>금액: {eventData.money}</div>
            <button>카카오 오픈톡 버튼</button>
          </div>
          <div className="user-container">
            <img // 참여이미지 표시
              src="https://cdn-bastani.stunning.kr/prod/portfolios/8735ec14-dccc-4ccd-92b8-cc559ac33bb2/contents/xcxZTwt6usiPmKNA.Mobile_Whale_World%202.jpg"
              /*{참여버튼 눌렀을 시 멤버id?로 받아올 이미지}*/ alt="userImage"
            />
            {/* 참여자 표시 */}
            <div>
              {eventData.currentPerson}/{eventData.totalPerson}
            </div>
            <button>참여 버튼</button>
          </div>
        </article>
        <article>
          <h1>{eventData.title}</h1>
          <div>{eventData.date}</div>
          <div>
            <div>{eventData.body}</div>
          </div>
          <div>
            {/* // Object.keys로 categoryMappings 객체의 키들을 배열로 바꿈,map사용해서 각 카테고리 키를 순회함 */}
            {Object.keys(categoryMappings).map((key) => {
              // 사용자가 선택한 카테고리와 일치하는 키값을 찾아서 그에 해당하는 ui 렌더링
              if (eventData.category === key) {
                return (
                  <CategoryBtn // 조건이 만족하면, CategoryBtn 컴포넌트를 생성하여 렌더링
                    key={key}
                    // ( categoryMappings[key]?. => categoryMappings 객체에서 특정 키에 해당하는 값의 프로퍼티를 가져옴)
                    // (옵셔널 체이닝 연산자(?.)는 key에 해당하는 label,backgroundColor 프로퍼티 값을 가져옴)
                    text={categoryMappings[key]?.label} //카테고리의 label 값을 text 프로퍼티로 전달
                    color={categoryMappings[key]?.backgroundColor} //카테고리의 backgroundColor 값을 color 프로퍼티로 전달
                  />
                );
              }
              return null; // 선택된 카테고리와 일치하지 않는 경우 null 반환하여 렌더링하지 않음
            })}
          </div>
          <div>map 표시 {eventData.location}</div>
        </article>
      </section>
    </EventDetailsContainer>
  );
}

const EventDetailsContainer = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  section {
    display: flex;
    gap: 80px;
  }

  article {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  img {
    width: 400px;
    height: 400px;
  }
  .image-container {
    position: relative;
  }
  .heart-button {
    position: absolute;
    top: 360px;
    left: 355px;
    border: none;
  }
  .heart-icon {
    font-size: 32px;
    color: red;
  }
  .likes-count {
    position: absolute;
    color: #ffffff;
    font-size: 14px;
    top: 367px; /* 상단 기준으로 중앙 정렬 */
    left: 373px; /* 좌측 기준으로 중앙 정렬 */
    cursor: pointer;
  }
  .host-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 400px;
    height: 40px;
  }

  .user-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 400px;
    height: 40px;
    margin-top: 10px;
  }

  .user-container > img {
    width: 40px;
    height: 40px;
    border-radius: 50px;
  }
  .host-btn {
    border: none;
    padding: 0px;
  }

  .host-img {
    width: 40px;
    height: 40px;
    border-radius: 50px;
  }
`;
export default InvitePage;
