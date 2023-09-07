import { useState } from 'react';
import axios from 'axios';
import MapKakao from '../services/MapKakao';
import { styled } from 'styled-components';
import CategoryBtn from '../components/CategoryBtn';
import CategoryMappings from '../components/CategoryMappings';

function InviteWritePage() {
  const [selectedButton, setSelectedButton] = useState(null);
  const [imageFromServer, setImageFromServer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  // 사용자입력값 상태변수
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    body: '',
    category: selectedButton,
    totalNum: 0,
    money: 0,
    latitude: '',
    longitude: '',
    address: '',
    imageUrl: selectedImage,
    member: {
      imageUrl: '', // 호스트 이미지
    },
  });
  console.log(formData);
  const token = //img 아이디
    'Bearer eyJhbGciOiJIUzM4NCJ9.eyJyb2xlcyI6WyJVU0VSIl0sIm5pY2tuYW1lIjoi7YWM7Iqk7Yq47ZWg6rGwIiwiaWQiOjE4LCJlbWFpbCI6InRqczQxMTNAZ21haWwuY29tIiwic3ViIjoidGpzNDExM0BnbWFpbC5jb20iLCJpYXQiOjE2OTQwNjIxOTEsImV4cCI6MTY5NDM2MjE5MX0.CnnDGtQiyHh0NtTEqFDAsj7jJAiEulU4YRHws4LdHoat7p6ZdB99fY7NhxpTnN8D';

  const handleSubmit = (e) => {
    e.preventDefault();

    // 서버로 POST 요청 보내기
    axios
      .post('http://3.39.76.109:8080/boards/new-boards', formData, {
        headers: {
          Authorization: token,
        },
      })
      .then(() => {
        // 요청 완료 후 페이지 새로고침
        console.log('요청됨');
        window.location.reload();
      })
      .catch((error) => {
        console.error('Error creating card:', error);
      });
  };

  // 카테고리 버튼 클릭 핸들러
  const handleButtonClick = async (buttonId) => {
    // 선택된 버튼 업데이트
    setSelectedButton(buttonId);
    console.log('클릭한 버튼:', buttonId);

    // formData 업데이트
    setFormData((prevData) => ({
      ...prevData,
      category: buttonId,
    }));

    try {
      // 서버에 카드 API 요청
      const response = await axios.get(
        `http://3.39.76.109:8080/cards/${buttonId}/images`,
      );

      setImageFromServer(response.data);
    } catch (error) {
      console.error('Error fetching image:', error);
    }
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

  // 모달 버튼 클릭 핸들러
  const handleModalClick = () => {
    if (!selectedButton) {
      // 사용자가 카테고리를 선택하지 않았다면
      alert(
        '카테고리를 선택하지 않을것인가? 그럼 자네는..모임장이 될 자격이 없네 !!',
      );
      return;
    }

    setIsModalOpen((prevState) => !prevState);
  };

  const handleImageClick = async (imageUrl) => {
    // 선택된 버튼 업데이트
    setSelectedImage(imageUrl);
    console.log(selectedImage);

    // formData 업데이트
    setFormData((prevData) => ({
      ...prevData,
      imageUrl: imageUrl,
    }));
  };

  return (
    <StyledWritePage>
      <section>
        <button onClick={handleModalClick} className="modal-btn">
          모달클릭!
        </button>

        <form onSubmit={handleSubmit}>
          <article>
            <div className="card-container">
              <div className="image-container">
                {formData.imageUrl ? (
                  <img src={formData.imageUrl} alt="선택된 카테고리의 이미지" />
                ) : (
                  <img
                    src="https://celebeeimage.s3.ap-northeast-2.amazonaws.com/board/CATEGORY_ETC/CATEGORY_ETC1.png"
                    alt="기본 이미지"
                  />
                )}
              </div>
              <div className="btn-box">
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
              {/* <label>
                Category:
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                />
              </label> */}
            </article>
          </form>

          {/* 모달 표시 */}
          {isModalOpen && (
            <div className="modal">
              {imageFromServer.map((imageUrl, index) => (
                <button
                  className="card-img"
                  key={index}
                  onClick={() => handleImageClick(imageUrl)}
                >
                  <img className="card-img" src={imageUrl} alt={`${index}`} />
                </button>
              ))}
            </div>
          )}

          {/*카테고리*/}
          <div className="category-btn">
            {Object.keys(CategoryMappings)
              .filter((key) => key !== 'CATEGORY_ALL') // 'All' 버튼 제외하고 렌더링
              .map((key) => {
                const buttonId = key; // 버튼 ID 설정
                // 선택된 버튼인지 여부를 확인하여 스타일 적용
                const isButtonSelected = selectedButton === buttonId;
                return (
                  <CategoryBtn
                    key={key}
                    isSelected={isButtonSelected}
                    className={isButtonSelected ? 'selected' : ''}
                    onClick={() => handleButtonClick(key)} // 클릭 이벤트 핸들러 전달
                    // ( categoryMappings[key]?. => categoryMappings 객체에서 특정 키에 해당하는 값의 프로퍼티를 가져옴)
                    // (옵셔널 체이닝 연산자(?.)는 key에 해당하는 label,backgroundColor 프로퍼티 값을 가져옴)
                    text={CategoryMappings[key]?.label} //카테고리의 label 값을 text 프로퍼티로 전달
                    color={CategoryMappings[key]?.backgroundColor} //카테고리의 backgroundColor 값을 color 프로퍼티로 전달
                  />
                );
              })}
          </div>
          {/*카테고리*/}
          <MapKakao onSelectLocation={handleLocationSelect} showSearch={true} />
        </div>
      </section>
    </StyledWritePage>
  );
}

const StyledWritePage = styled.div`
  margin: 0px 320px;

  section {
    position: relative;
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
  .category-btn {
    display: grid;
    grid-template-columns: repeat(3, 1fr); // 한 줄에 3개의 열을 생성합니다.
    gap: 10px; // 버튼 사이의 간격을 조절할 수 있습니다.
    width: 100%;
  }

  button {
    width: 100%;
    /* box-shadow: 1px 3px 4px rgb(0, 0, 0, 0.4); */
  }

  /* button:active {
    transform: translateY(2px); // 클릭 시 버튼을 아래로 2px 이동
    box-shadow: 1px 1px rgb(0, 0, 0, 0.7);
  } */

  .modal-btn {
    position: absolute;
    top: 377px;
    left: 519px;
    width: 80px;
  }
  .submit-btn {
    position: relative;
    width: 80px;
  }
  .modal {
    position: absolute;
    z-index: 999;
    top: 0;
    left: 600px;
    display: grid;
    place-items: center;
    justify-content: center;
    grid-template-columns: repeat(2, 1fr); // 한 줄에 3개의 열을 생성합니다.
    width: 370px;
    height: 400px;
    background-color: #96a6f4;
    background: linear-gradient(
      135deg,
      rgba(18, 104, 233, 10) 10%,
      rgba(196, 113, 237, 10) 50%,
      rgba(246, 79, 89, 10) 100%
    );
  }
  .card-img {
    width: 150px;
    height: 150px;
    /* background-color: transparent;
    border: none; */
  }
`;

export default InviteWritePage;
