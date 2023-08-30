import { useState, useEffect } from 'react';
import axios from 'axios';
import { styled } from 'styled-components';

const categoryMappings = {
  CATEGORY_LEISURE: { label: 'LEISURE', backgroundColor: 'yellow' },
  CATEGORY_TRAVEL: { label: 'TRAVEL', color: 'green' },
  CATEGORY_GAME: { label: 'GAME', color: 'blue' },
  CATEGORY_CULTURE: { label: 'CULTURE', color: 'purple' },
  CATEGORY_EDUCATION: { label: 'EDUCATION', backgroundColor: '#4CA899' },
  CATEGORY_ETC: { label: 'ETC', color: 'gray' },
};

function InvitePage() {
  const [eventData, setEventData] = useState({
    cardTitle: '',
    cardDate: '',
    cardBody: '',
    cardCategory: '',
    currentPerson: 0,
    totalPerson: 0,
    cardMoney: 0,
    cardLikesCount: 0,
    cardStatus: '',
    member: {
      memberId: 0,
      memberNickname: '',
    },
  });

  const [clickCount, setClickCount] = useState(0); // 좋아요 클릭 수 상태

  const clickHandler = () => {
    setClickCount(clickCount + 1);
  };

  useEffect(() => {
    const cardId = '2'; // 예시로 아이디값 지정 (카드생성 페이지 구현 완료시 응답값에서 받아올 것)

    // API 엔드포인트 URL
    const apiUrl = `http://3.39.76.109:8080/cards/${cardId}`;

    axios
      .get(apiUrl)
      .then((response) => {
        const eventData = response.data; // API 응답 데이터를 가져옴
        setEventData(eventData);
      })
      .catch((error) => {
        console.error('Error fetching event data:', error);
      });
  }, []); // 빈 배열을 전달하여 한 번만 실행되도록 설정

  return (
    <EventDetailsContainer>
      <section>
        <article>
          <div className="card-container">
            <img
              src="https://cdn-bastani.stunning.kr/prod/portfolios/8735ec14-dccc-4ccd-92b8-cc559ac33bb2/contents/xcxZTwt6usiPmKNA.Mobile_Whale_World%202.jpg"
              alt="cardImage"
            />
            <div>{clickCount}</div>
            <button onClick={clickHandler}>❤️</button>
            <button>카카오 공유버튼</button>
          </div>
          <div className="host-container">
            <button>
              <img // 유저이미지 표시
                src={eventData.img}
                /*{멤버id로 받아올 호스트 이미지}*/ alt="hostImage"
              />
            </button>
            <div>금액: {eventData.cardMoney}</div>
            <button>카카오 송금 버튼</button>
            <button>카카오 오픈톡 버튼</button>
          </div>
          <div className="user-container">
            <img // 참여이미지 표시
              src="https://cdn-bastani.stunning.kr/prod/portfolios/8735ec14-d ccc-4ccd-92b8-cc559ac33bb2/contents/xcxZTwt6usiPmKNA.Mobile_Whale_World%202.jpg"
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
          <h1>{eventData.cardTitle}</h1>
          <div>{eventData.cardDate}</div>
          <div>
            <div>{eventData.cardBody}</div>
          </div>
          <button
            style={{
              backgroundColor:
                categoryMappings[eventData.cardCategory]?.backgroundColor,
            }}
          >
            {categoryMappings[eventData.cardCategory]?.label}
          </button>
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

  img {
    width: 400px;
    height: 400px;
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
  button {
    width: 80px;
    height: 30px;
    border: 1px solid;
    border-radius: 50px;
    /* background-color: transparent; */
    cursor: pointer;
  }
`;
export default InvitePage;
