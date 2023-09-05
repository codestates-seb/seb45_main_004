import { useState } from 'react';
import axios from 'axios';
import MapKakao from '../services/MapKakao';
import { styled } from 'styled-components';
// import CategoryBtn from '../components/CategoryBtn';
// import CategoryMappings from '../components/CategoryMappings';

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = //tjs4114아이디
      'Bearer eyJhbGciOiJIUzM4NCJ9.eyJyb2xlcyI6WyJVU0VSIl0sIm5pY2tuYW1lIjoi6rmA7ISg66-4IiwiaWQiOjQsImVtYWlsIjoidGpzNDExNEBnbWFpbC5jb20iLCJzdWIiOiJ0anM0MTE0QGdtYWlsLmNvbSIsImlhdCI6MTY5MzkwNjg2MCwiZXhwIjoxNjk0MjA2ODYwfQ.uF6iBqduhjsjzSHWIWs5mhdnG96Dku1GK99665jf1HpsHWN-rzVVyglCV1xu1y_3';

    // 서버로 POST 요청 보내기
    axios
      .post('http://3.39.76.109:8080/boards/new-boards', formData, {
        headers: {
          Authorization: token,
        },
      })
      .then(() => {
        // 요청 완료 후 페이지 새로고침
        window.location.reload();
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
    <StyledWritePage>
      <section>
        <form onSubmit={handleSubmit}>
          <article>
            <div className="card-container">
              <div className="image-container">
                <img
                  src="https://cdn-bastani.stunning.kr/prod/portfolios/8735ec14-dccc-4ccd-92b8-cc559ac33bb2/contents/xcxZTwt6usiPmKNA.Mobile_Whale_World%202.jpg"
                  alt="cardImage"
                />
              </div>
              <div className="btn-box">
                <button>모달클릭 !</button>
                <button className="submit-btn" type="submit">
                  Create Card
                </button>
              </div>
            </div>
          </article>
        </form>
        <div>
          <form>
            <article>
              <label>
                Title:
                <input
                  className="title-date"
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                />
              </label>
              <div className="date-box">
                <label>
                  Date:
                  <input
                    className="date-date"
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                  />
                </label>
                <label>
                  Person:
                  <input
                    className="person-date"
                    type="number"
                    name="totalNum"
                    value={formData.totalNum}
                    onChange={handleInputChange}
                  />
                </label>
              </div>
              <label>
                Money:
                <input
                  className="money-date"
                  type="number"
                  name="money"
                  value={formData.money}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Body:
                <textarea
                  className="body-date"
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
            </article>
          </form>
          <MapKakao onSelectLocation={handleLocationSelect} showSearch={true} />
        </div>
      </section>
    </StyledWritePage>
  );
}

const StyledWritePage = styled.div`
  margin: 0px 320px;

  section {
    margin: 50px 0px;
    display: flex;
    gap: 20px;
    padding: 0px 200px;
  }
  img {
    width: 400px;
    height: 400px;
  }

  .btn-box {
    display: flex;
    justify-content: space-between;
  }
  input,
  textarea {
    width: 100%;
    background-color: transparent;
    border: 1px solid;
    border-radius: 20px;
    height: 40px;
    padding: 10px;
  }
  .date-box {
    display: flex;
    justify-content: space-between;
  }
  .date-date {
    width: 210px;
  }
  .body-date {
    height: 150px;
  }

  .search-box {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 20px;
    padding: 20px 0px;
  }

  #address-input {
    background-color: white;
    width: 90%;
    height: 20px;
  }
  #search-button {
    height: 20px;
    flex: 1;
  }
`;

export default InviteWritePage;
