import { useState } from 'react';
import axios from 'axios';
import MapKakao from '../services/MapKakao';
import { EventDetailsContainer } from './InvitePage';

function InviteWritePage() {
  // 사용자입력값 상태변수
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    body: '',
    category: '',
    totalNum: 0,
    money: 0,
    latitude: '',
    longitude: '',
    address: '',
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    // 서버로 보낼 데이터 생성
    const requestData = {
      title: formData.title,
      date: formData.date,
      body: formData.body,
      category: formData.category,
      totalNum: formData.totalNum,
      money: formData.money,
      latitude: formData.latitude,
      longitude: formData.longitude,
      address: formData.address,
    };
    console.log(requestData);
    const token = //tjs4114아이디
      'Bearer eyJhbGciOiJIUzM4NCJ9.eyJyb2xlcyI6WyJVU0VSIl0sIm5pY2tuYW1lIjoi6rmA7ISg66-4IiwiaWQiOjQsImVtYWlsIjoidGpzNDExNEBnbWFpbC5jb20iLCJzdWIiOiJ0anM0MTE0QGdtYWlsLmNvbSIsImlhdCI6MTY5MzY2NDE2MSwiZXhwIjoxNjkzOTY0MTYxfQ.LIIkPYkkNoumD09XQOi-GuKiC9Zimz7HfaatUhasvHcuXA2i6RnePzeeJ_zkcoYN';

    // 서버로 POST 요청 보내기
    axios
      .post('http://3.39.76.109:8080/boards/new-boards', requestData, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        // 성공적으로 생성되었을 때 처리할 로직
        console.log('Card created successfully:/', response.data);
      })
      .catch((error) => {
        console.error('Error creating card:', error);
      });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // 사용자가 지도에서 선택한 장소 정보를 업데이트하는 함수
  const handleLocationSelect = (latitude, longitude, address) => {
    setFormData((prevData) => ({
      ...prevData,
      latitude,
      longitude,
      address,
    }));
  };

  return (
    <EventDetailsContainer>
      <section>
        <form onSubmit={handleSubmit}>
          <article>
            <div className="card-container">
              <div className="image-container">
                <img
                  src="https://cdn-bastani.stunning.kr/prod/portfolios/8735ec14-dccc-4ccd-92b8-cc559ac33bb2/contents/xcxZTwt6usiPmKNA.Mobile_Whale_World%202.jpg"
                  alt="cardImage"
                />
                <button>모달클릭 !</button>
              </div>
            </div>
          </article>
          <article></article>
          <label>
            Title:
            <input
              className="title-box"
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Date:
            <input
              className="title-date"
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Person:
            <input
              className="title-date"
              type="number"
              name="totalNum"
              value={formData.totalNum}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Money:
            <input
              className="title-date"
              type="number"
              name="money"
              value={formData.money}
              onChange={handleInputChange}
            />
          </label>

          <label>
            Body:
            <textarea
              className="title-body"
              name="body"
              value={formData.body}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Category:
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
            />
          </label>

          <MapKakao
            onSelectLocation={handleLocationSelect}
            showSearch={true}
            // showMarker={true}
          />
          <button type="submit">Create Card</button>
        </form>
      </section>
    </EventDetailsContainer>
  );
}

export default InviteWritePage;
