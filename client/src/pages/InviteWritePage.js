import { useState } from 'react';
import axios from 'axios';
import MapKakao from '../services/MapKakao';
import { styled } from 'styled-components';
import CategoryBtn from '../components/CategoryBtn';
import CategoryMappings from '../components/CategoryMappings';
import { BiEdit } from 'react-icons/bi';

function InviteWritePage() {
  const token = localStorage.getItem('jwtToken');
  console.log(token);

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
  // const token = //img 아이디
  //   'Bearer eyJhbGciOiJIUzM4NCJ9.eyJyb2xlcyI6WyJVU0VSIl0sIm5pY2tuYW1lIjoi7YWM7Iqk7Yq47ZWg6rGwIiwiaWQiOjE4LCJlbWFpbCI6InRqczQxMTNAZ21haWwuY29tIiwic3ViIjoidGpzNDExM0BnbWFpbC5jb20iLCJpYXQiOjE2OTQwNjIxOTEsImV4cCI6MTY5NDM2MjE5MX0.CnnDGtQiyHh0NtTEqFDAsj7jJAiEulU4YRHws4LdHoat7p6ZdB99fY7NhxpTnN8D';

  const handleSubmit = (e) => {
    e.preventDefault();

    // 유효성 검사 로직 추가
    if (!formData.title.trim() || !formData.date || !formData.body.trim()) {
      alert('모든 필드를 입력해주세요.');
      return;
    }

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
      alert('카테고리를 선택해주세요');
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

  const handleModalBackgroundClick = (event) => {
    // 클릭된 요소가 모달 배경인지 확인
    if (event.target === event.currentTarget) {
      setIsModalOpen(false);
    }
  };
  const currentDate = new Date().toISOString().split('T')[0];
  return (
    <StyledWritePage>
      <section>
        <button className="modal-btn" onClick={handleModalClick}>
          <BiEdit className="edit-btn" />
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
                  Submit
                </button>
              </div>
            </div>
          </article>
        </form>
        <div>
          <form>
            <article className="form-box">
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
                    min={currentDate}
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
                    min="0"
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
                  min="0"
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
            </article>
          </form>

          {/* 모달 표시 */}
          {isModalOpen && (
            <div
              className="modal-background"
              onClick={handleModalBackgroundClick}
              onKeyDown={handleModalBackgroundClick}
              role="button"
              tabIndex="0"
            >
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
  display: flex;
  justify-content: center;

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

  .form-box {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  input,
  textarea {
    width: 100%;
    background-color: rgba(244, 227, 233, 0.4);
    border: none;
    height: 40px;
    padding: 10px;
  }
  .date-box {
    display: grid;
    grid-template-columns: repeat(2, 1fr); // 한 줄에 3개의 열을 생성합니다.
  }

  .body-date {
    min-height: 150px;
    max-height: 150px;
    max-width: 500px;
    min-width: 446px;
  }

  .search-box {
    margin: 10px 0px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 38px;
    background-color: rgba(244, 227, 233, 0.4);
  }

  #address-input {
    background-color: transparent;
    width: 90%;
    height: 20px;
  }
  #search-button {
    width: 38px;
    height: 38px;
    background-color: rgba(244, 227, 233, 0.4);
    border: none;
  }
  .category-btn {
    margin: 16px 0px;
    display: grid;
    grid-template-columns: repeat(3, 1fr); // 한 줄에 3개의 열을 생성합니다.
    grid-gap: 13px; // 버튼 사이의 간격을 조절할 수 있습니다.
  }

  .modal-btn {
    position: absolute;
    width: 38px;
    left: 200px;
    height: 38px;
    top: 362px;
    background-color: #d25bea;
    border: none;
  }

  .modal-btn:active,
  .submit-btn:active,
  #search-button:active {
    transform: translateY(1px); // 클릭 시 버튼을 아래로 2px 이동
    box-shadow: 1px 1px rgb(0, 0, 0, 0.7);
  }

  .edit-btn {
    width: 28px;
    height: 28px;
    color: whitesmoke;
    margin-top: 1px;
  }
  .submit-btn {
    position: relative;
    width: 100px;
    height: 38px;
    border: none;
    background-color: rgba(244, 227, 233, 0.4);
    left: 300px;
    margin-top: 10px;
  }
  .modal {
    position: absolute;
    z-index: 999;
    display: flex;
    align-items: center;

    gap: 10px;
    padding: 20px 20px;
    width: 450px;
    height: 550px;
    flex-wrap: wrap;
    background-color: rgb(218, 170, 245, 0.26);
  }

  /* 모달의 배경 */
  .modal-background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center; /* 세로 중앙 정렬 */
    justify-content: center; /* 가로 중앙 정렬 */
    z-index: 1000; /* 다른 요소 위에 표시 */
  }

  .card-img {
    width: 200px;
    height: 200px;
  }

  @media (max-width: 768px) {
    section {
      flex-direction: column;
    }
    img {
      width: 100%;
      height: auto;
    }
    .modal-btn {
      top: 408px;
    }

    .submit-btn {
      left: 0px;
    }
  }
`;

export default InviteWritePage;
