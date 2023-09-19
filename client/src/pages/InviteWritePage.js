import { useState } from 'react';
import axios from 'axios';
import MapKakao from '../services/MapKakao';
import { styled } from 'styled-components';
import CategoryBtn from '../components/CategoryBtn';
import CategoryMappings from '../components/CategoryMappings';
import { BiEdit } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

function InviteWritePage() {
  const token = localStorage.getItem('jwtToken');
  const api = 'https://api.celebee.kro.kr';
  const navigate = useNavigate();
  const [selectedButton, setSelectedButton] = useState(null);
  const [imageFromServer, setImageFromServer] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(1);

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
  });

  // 모집 글 작성 요청
  const handleSubmit = async (e) => {
    e.preventDefault();
    const fieldValidations = [
      { field: 'title', error: '제목을 입력해주세요.' },
      { field: 'date', error: '날짜를 선택해주세요.' },
      { field: 'totalNum', error: '인원 수를 선택해주세요.' },
      { field: 'body', error: '내용을 입력해주세요.' },
      { field: 'category', error: '카테고리를 선택해주세요.' },
      { field: 'address', error: '장소를 선택해주세요.' },
      { field: 'imageUrl', error: '이미지를 선택해주세요.' },
    ];

    const invalidField = fieldValidations.find(
      ({ field }) =>
        !formData[field] ||
        (typeof formData[field] === 'string' && !formData[field].trim()),
    );

    if (invalidField) {
      alert(invalidField.error);
      return;
    }

    try {
      const response = await axios.post(`${api}/boards/new-boards`, formData, {
        headers: {
          Authorization: token,
        },
      });

      navigate(`/boards/${response.data.boardId}`);
      console.log('요청됨');
    } catch (error) {
      console.error('Error creating card:', error);
    }
  };

  // 입력값 관리
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (
      name === 'date' &&
      new Date(value) < new Date(ThreeDaysAfterCurrentDate)
    ) {
      alert(
        '작성하시려는 모임의 마감일은 오늘입니다. 모집일은 오늘로부터 3일 후부터 가능합니다. ',
      );
      return;
    }

    if (name === 'money') {
      const pureNumber = value.replace(/,/g, ''); // 콤마 제거
      const numericValue = isNaN(parseInt(pureNumber, 10))
        ? 0
        : parseInt(pureNumber, 10);

      // 백만원 초과 검증
      if (numericValue > 1000000) {
        alert('백만원을 초과할 수 없습니다.');
        return;
      }

      setFormData((prevData) => ({
        ...prevData,
        [name]: numericValue,
      }));
    }

    // 바디의 글자 수 검증 로직
    else if (name === 'body' && value.length > 255) {
      alert('본문의 글자 수는 255글자를 넘을 수 없습니다.');
      return;
    } else {
      // 다른 필드들의 처리 로직
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const getCurrentDateInKST = () => {
    return new Date()
      .toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        timeZone: 'Asia/Seoul',
      })
      .replace(/\./g, '-')
      .replace(/\s/g, '') // 공백 제거
      .slice(0, -1);
  };

  const getDaysAfterInKST = (days) => {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date
      .toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        timeZone: 'Asia/Seoul',
      })
      .replace(/\./g, '-')
      .replace(/\s/g, '') // 공백 제거
      .slice(0, -1);
  };

  const ThreeDaysAfterCurrentDate = getDaysAfterInKST(3);
  const currentDate = getCurrentDateInKST();

  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  // 카테고리 버튼 클릭
  const handleCategoryButtonClick = async (buttonId) => {
    setSelectedButton(buttonId);

    setSelectedImage(null);

    setFormData((prevData) => ({
      ...prevData,
      category: buttonId,
      imageUrl: null,
    }));

    try {
      const response = await axios.get(`${api}/cards/${buttonId}/images`);
      setImageFromServer(response.data);
    } catch (error) {
      console.error('Error fetching image:', error);
    }
  };

  // 지도 좌표 전달
  const handleLocationSelect = (latitude, longitude, address) => {
    setFormData((prevData) => ({
      ...prevData,
      latitude,
      longitude,
      address,
    }));
  };

  const handleModalClick = () => {
    if (!selectedButton) {
      alert('카테고리를 선택해주세요');
      return;
    }
    setIsModalOpen((prevState) => !prevState);
  };

  const handleImageClick = async (imageUrl) => {
    setSelectedImage(imageUrl);
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

  const handleNextImage = () => {
    if (currentIndex < imageFromServer.length - 1) {
      // 마지막 이미지가 아니라면
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePrevImage = () => {
    if (currentIndex > 0) {
      // 첫 번째 이미지가 아니라면
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

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
                  <img
                    className="main-img"
                    src={formData.imageUrl}
                    alt="선택된 카테고리의 이미지"
                  />
                ) : (
                  <img
                    className="main-img"
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
          <form onSubmit={handleSubmit}>
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
                  type="text"
                  name="money"
                  value={numberWithCommas(formData.money)}
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
          {isModalOpen && (
            <div
              className="modal-background"
              onClick={handleModalBackgroundClick}
              onKeyDown={handleModalBackgroundClick}
              role="button"
              tabIndex="0"
            >
              <div className="modal">
                <button onClick={handlePrevImage}>이전</button>
                <button onClick={handleNextImage}>다음</button>
                <div
                  className="slider-container"
                  style={{ transform: `translateX(-${currentIndex * 220}px)` }}
                >
                  {imageFromServer.map((imageUrl, index) => (
                    <button
                      className="card-img-container" // 변경된 부분
                      key={index}
                      onClick={() => handleImageClick(imageUrl)}
                    >
                      <img
                        className="card-img"
                        src={imageUrl}
                        alt="카드이미지"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/*카테고리*/}
          <div className="category-btn">
            {Object.keys(CategoryMappings)
              .filter((key) => key !== 'CATEGORY_ALL')
              .map((key) => {
                const buttonId = key;
                const isButtonSelected = selectedButton === buttonId;
                return (
                  <CategoryBtn
                    key={key}
                    isSelected={isButtonSelected}
                    className={isButtonSelected ? 'selected' : ''}
                    onClick={() => handleCategoryButtonClick(key)}
                    text={CategoryMappings[key]?.label}
                    color={CategoryMappings[key]?.backgroundColor}
                  />
                );
              })}
          </div>
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

  .btn-box {
    display: flex;
    justify-content: space-between;
  }

  .form-box {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: -7px;
  }
  input,
  textarea {
    width: 100%;
    background-color: rgba(244, 227, 233, 0.4);
    border: none;
    height: 40px;
    padding: 10px;
  }

  .form-box label > input,
  textarea,
  .submit-btn,
  .search-box,
  .main-img,
  #map {
    box-shadow: 4px 3px 10px rgba(0, 0, 0, 0.2);
  }

  .main-img {
    width: 400px;
    height: 400px;
  }
  .date-box {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
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
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 14px;
  }

  .edit-btn {
    width: 28px;
    height: 28px;
    color: whitesmoke;
    margin-top: 1px;
    cursor: pointer;
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
    justify-content: center;
    gap: 10px;
    padding: 20px;
    width: 600px;
    height: 430px;
    flex-wrap: wrap;
    border-radius: 20px;
    background-color: rgba(255, 255, 255, 0.8);
    overflow: hidden;
    box-shadow: 1px 1px 7px 5px rgb(0, 0, 0, 0.3);
  }

  .modal button {
    background-color: #fff;
    padding: 5px 10px;
    margin: 5px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  .modal button:hover {
    background-color: #ddd;
  }

  .slider-container {
    display: flex;
    transition: transform 0.3s;
    width: 100%;
  }

  .modal-btn {
    position: absolute;
    width: 38px;
    left: 200px;
    height: 38px;
    top: 362px;
    background-color: #d25bea;
    border: none;
    z-index: 1;
  }

  .modal-btn:active,
  .submit-btn:active,
  #search-button:active {
    transform: translateY(1px); // 클릭 시 버튼을 아래로 2px 이동
    box-shadow: 1px 1px rgb(0, 0, 0, 0.7);
  }

  .card-img-container {
    width: 320px;
    height: 320px;
    border: none;
    box-shadow: 4px 3px 10px rgba(0, 0, 0, 0.2);
    margin: 0 10px;
  }

  .card-img {
    width: 300px;
    height: 300px;
  }

  .card-img:active {
    transform: translateY(1px);
  }

  .modal-background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
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
      top: 410px;
    }

    .submit-btn {
      left: 0px;
    }

    .main-img {
      width: 100%;
      height: 100%;
    }
  }
`;

export default InviteWritePage;
