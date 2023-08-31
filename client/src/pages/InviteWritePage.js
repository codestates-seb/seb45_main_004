import { useState } from 'react';
import axios from 'axios';

function InviteWritePage() {
  // 사용자입력값 상태변수
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    body: '',
    category: '',
    person: 0,
    money: 0,
  });

  const handleSubmit = (event) => {
    event.preventDefault(); // 오타 수정
    // 서버로 보낼 데이터 생성
    const requestData = {
      title: formData.title,
      date: formData.date,
      body: formData.body,
      category: formData.category,
      person: formData.person,
      money: formData.money,
    };

    const token =
      'Bearer eyJhbGciOiJIUzM4NCJ9.eyJyb2xlcyI6WyJVU0VSIl0sIm5pY2tuYW1lIjoi7ZWY66Oo7IK07J20IiwiaWQiOjEsImVtYWlsIjoiT25lZGF5QGdtYWlsLmNvbSIsInN1YiI6Ik9uZWRheUBnbWFpbC5jb20iLCJpYXQiOjE2OTM0NjM5NzcsImV4cCI6MTY5Mzc2Mzk3N30.DAtiS54qosERLz0kcntjRvkLyNexO9ticAJDVhChJDD2vXpSvTOrZmldqzMAdzSv';

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

  return (
    <div>
      <h2>Create a New Card</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Date:
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Body:
          <textarea
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
        <label>
          Person:
          <input
            type="number"
            name="person"
            value={formData.person}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Money:
          <input
            type="number"
            name="money"
            value={formData.money}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit">Create Card</button>
      </form>
    </div>
  );
}

export default InviteWritePage;
