import { styled } from 'styled-components';
import { FaSearch } from 'react-icons/fa';
import CategoryBtn from '../components/CategoryBtn';
import CategoryMappings from '../components/CategoryMappings';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const HomePage = styled.div`
  display: flex;
  justify-content: center;
  /* height: 100vh; */

  .main-container {
    margin: 0px 320px;
  }

  .main-header {
    display: flex;
    justify-content: center;
    height: 350px;
    margin-top: 156px;
    border: solid 1px black;
    align-items: center;
  }
  .service-introduction {
    color: white;
  }
  .search-container {
    display: flex;
    justify-content: center;
    margin-bottom: 40px;
  }
  .search {
    display: flex;
    width: 500px;
    height: 40px;
    border: solid 1px black;
    border-radius: 10px;
    align-items: center;
    justify-content: space-between;
  }
  .search-text {
    background: none;
    border: none;
    width: 500px;
    height: 40px;
    caret-color: black; // 검색창 cursor 효과
    padding-left: 20px;
    outline: none;
    // 검색시 input ouline 없애주기
  }
  .categorys-container {
    display: flex;
    flex-direction: row;
    list-style: none;
    justify-content: center;
    padding: 0;
    margin: 20px 0px;
  }
  .invitation-container {
    display: grid;
    flex-direction: row;
    margin-top: 20px;
    grid-template-columns: repeat(3, 1fr);
  }
  .invitation-item {
    display: flex;
    justify-content: center;
    height: 200px;
  }
`;

const SearchBtn = styled.button`
  display: flex;
  align-items: center;
  padding-right: 10px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
`;

export default function Homepage() {
  const [invitation, setInvitation] = useState([]); // 모든 게시물 저장
  const [filteredInvitation, setFilteredInvitation] = useState([]); // 필터된 게시물을 저장
  const [selectedCategory, setSelectedCategory] = useState(null); // 선택된 카테고리를 저장
  const [search, setSearch] = useState(''); // 검색어를 입력하는 상태 추가

  useEffect(() => {
    axios
      .get('http://3.39.76.109:8080/boards')
      .then((response) => {
        const newData = response.data;
        const sortedInvitation = newData.sort(
          (a, b) => new Date(b.boardId) - new Date(a.boardId),
        );
        setInvitation(sortedInvitation);
        setFilteredInvitation(sortedInvitation); // 최초 렌더링시 전체데이터가 보이게끔 구현하기 위해 넣음
      })
      .catch((error) => {
        console.log('error', error);
      });
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category); // 선택된 카테고리 상태를 설정
    if (category === 'CATEGORY_ALL') {
      // "ALL" 버튼을 누른 경우에는 전체 데이터를 필터링하지 않고 그대로 사용합니다.
      setFilteredInvitation(invitation);
      console.log('전체', invitation);
    } else {
      // 다른 카테고리 버튼을 누른 경우 해당 카테고리만 필터링하여 할당합니다.
      const filteredData = invitation.filter(
        (item) => item.category === category,
      );
      setFilteredInvitation(filteredData);
      console.log('필터된 데이터', filteredData);
    }
  };

  // 검색 버튼클릭시 호출되는 함수
  const titleSearch = (category) => {
    // 선택된 카테고리가 있으면
    // if (selectedCategory) {
    // 전체 검색창에서 검색되는 url과 선택된 카테고리에서만 검색되는 url
    const searchApi =
      category === 'CATEGORY_ALL'
        ? `http://3.39.76.109:8080/boards/search/title/?title=${search}`
        : `http://3.39.76.109:8080/boards/category/${category}/search/title/?title=${search}`;
    axios
      .get(searchApi)
      .then((response) => {
        const titleData = response.data;
        setFilteredInvitation(titleData);
        console.log(titleData); // 검색창에 검색어와 동일한 내용만 필터
        setSearch('');
      })
      .catch((error) => {
        console.log('Error', error);
      });
    // }
  };
  // 키 이벤트핸들러 함수
  // Enter를 쳤을때 tilteSearch 함수를 불러옴
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      titleSearch(selectedCategory); // 선택된 카테고리에서만 tiltesearch함수가 실행
    }
  };

  // 전체 초대글 좋아요 순
  const likesSort = (category) => {
    const apiUrl =
      category === 'CATEGORY_ALL'
        ? `http://3.39.76.109:8080/boards/likes`
        : `http://3.39.76.109:8080/boards/category/${category}/likes`;
    axios
      .get(apiUrl)
      .then((response) => {
        const likeData = response.data;
        // 좋아요 순서대로 보여주기 위한 구현
        const sortedData = likeData.sort(
          (a, b) => b.boardLikesCount - a.boardLikesCount,
        );
        setFilteredInvitation(sortedData);
        console.log(sortedData);
      })
      .catch((error) => {
        console.log('Error', error);
      });
  };

  // 좋아요순을 위한 클릭 함수
  const handleLikeSortClick = () => {
    likesSort(selectedCategory);
  };

  return (
    <HomePage>
      <div className="main-container">
        <div className="main-header">
          <h1 className="service-introduction">
            Hi! Make new friends at Celebee 🐝
          </h1>
        </div>
        <div className="categorys-container">
          <ul className="categorys-container">
            {Object.keys(CategoryMappings).map((key) => {
              const categoryName = CategoryMappings[key]?.name;
              const isSelected = selectedCategory === categoryName;
              return (
                <CategoryBtn
                  key={key}
                  text={CategoryMappings[key]?.label}
                  color={
                    CategoryMappings[key]?.backgroundColor ||
                    CategoryMappings[key]?.color
                  }
                  isSelected={isSelected}
                  onClick={() => handleCategoryClick(categoryName)}
                />
              );
            })}
          </ul>
        </div>
        <div className="search-container">
          <div className="search">
            <input
              type="text"
              id="search"
              placeholder="Search"
              className="search-text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <SearchBtn className="icon-search" onClick={titleSearch}>
              <FaSearch />
            </SearchBtn>
          </div>
        </div>
        <div className="likes-container">
          <button className="likes-sort" onClick={handleLikeSortClick}>
            좋아요순
          </button>
        </div>
        <div className="invitation-container">
          {filteredInvitation.map((item) => (
            <Link
              key={item.boardId}
              to={`/boards/${item.boardId}`}
              className="invitation-item"
            >
              <h2>{item.title}</h2>
            </Link>
          ))}
        </div>
      </div>
    </HomePage>
  );
}
