import { styled } from 'styled-components';
import { FaSearch } from 'react-icons/fa';
import { FcLike } from 'react-icons/fc';
import CategoryBtn from '../components/CategoryBtn';
import CategoryMappings from '../components/CategoryMappings';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';

const HomePage = styled.div`
  display: flex;
  justify-content: center;

  .main-container {
    margin: 0px 320px;
  }

  .main-header {
    display: flex;
    justify-content: center;
    height: 350px;
    margin-top: 50px;
    align-items: center;
    /* animation: slideTExt 10s linear infinite; // 5초 동안 일정한 속도(linear)로 애니매이션이 적용되고 무한 반복됨 (infinite) */
  }
  .service-introduction {
    color: white;
  }
  .search-container {
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
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
    gap: 20px;
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
    height: 300px;
    margin-bottom: 30px;
    position: relative;
  }
  .likes-container {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-bottom: 25px;
  }
  .likes-sort {
    display: flex;
    align-items: center;
    background: none;
    border: none;
    cursor: pointer;
    font-size: 25px;
    border: solid 1px #d9d9d9;
    padding: 3px 5px;
    border-radius: 20px;
  }
  .likes-text {
    display: flex;
    align-items: center;
    font-size: 15px;
    font-weight: 800;
    margin-left: 5px;
    cursor: pointer;
  }
  .invitation-image-container {
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: hidden; // 부모요소에 적용시키고 부모 요소의 범위를 벗어나는 자식 요소의 내용을 감춤
  }
  .invitation-info-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 300px;
    height: 300px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 10px;
    text-align: center;
    gap: 10px;
    transition:
      opacity 0.3s,
      visibility 0.3s; /* 전환 효과를 추가 */
    opacity: 0; /* 초기에는 보이지 않도록 설정 */
    visibility: hidden; /* 초기에는 숨김 처리 */
  }
  .invitation-image-container:hover .invitation-info-container {
    opacity: 1;
    visibility: visible;
  }
  .likes_icon {
    margin-right: 5px;
  }
  .like-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  .header-frame1 {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .frame1-content {
    display: flex;
    flex-direction: column;
    gap: 30px;
    margin-right: 20px;
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

const Image = styled.img`
  width: 300px;
  height: 300px;
  &.header-image {
    border-radius: 20px;
  }
`;

export default function Homepage() {
  const [invitation, setInvitation] = useState([]); // 모든 게시물 저장
  // const [filteredInvitation, setFilteredInvitation] = useState([]); // 필터된 게시물을 저장 -> 해당 상태를 currentInvitaions 상태값으로 저장 가능
  const [selectedCategory, setSelectedCategory] = useState('CATEGORY_ALL'); // 선택된 카테고리를 저장
  const [search, setSearch] = useState(''); // 검색어를 입력하는 상태 추가
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [currentInvitations, setCurrentInvitations] = useState([]);
  const PER_SCROLL = 10;

  const fetchAllInvitaion = () => {
    axios
      .get('http://3.39.76.109:8080/boards')
      .then((response) => {
        const newData = response.data;
        const sortedInvitation = newData.sort(
          (a, b) => new Date(b.boardId) - new Date(a.boardId),
        );
        setInvitation(sortedInvitation);
      })
      .then(() => {
        getInvitations(PER_SCROLL);
      })
      .catch((error) => {
        console.log('error', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const getInvitations = (perscroll) => {
    if (invitation.length === 0) return; // 로딩 중이거나 초대장 데이터가 없으면 함수를 종료합니다.
    const prevInvitations = [...currentInvitations];
    // invitation 배열에서 현재 페이지에 해당하는 데이터를 슬라이스합니다.
    const newInvitations = invitation.slice(
      (currentPage - 1) * perscroll,
      currentPage * perscroll,
    );

    // 현재 보이는 초대장 데이터에 새로운 데이터를 추가합니다.
    setCurrentInvitations([...prevInvitations, ...newInvitations]);

    // 다음 페이지로 현재 페이지를 업데이트합니다.
    setCurrentPage(currentPage + 1);
  };

  useEffect(() => {
    fetchAllInvitaion();
  }, []);

  useEffect(() => {
    if (invitation.length === 0) return;
    if (currentPage > 1) return;
    getInvitations(PER_SCROLL);
  }, [invitation]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category); // 선택된 카테고리 상태를 설정
    if (category === 'CATEGORY_ALL') {
      // "ALL" 버튼을 누른 경우에는 전체 데이터를 필터링하지 않고 그대로 사용합니다.
      setCurrentInvitations(invitation);
    } else {
      // 다른 카테고리 버튼을 누른 경우 해당 카테고리만 필터링하여 할당합니다.
      const filteredData = invitation.filter(
        (item) => item.category === category,
      );
      setCurrentInvitations(filteredData);
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
        setCurrentInvitations(titleData);
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
        setCurrentInvitations(sortedData);
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
          <div className="header-frame1">
            <div className="frame1-content">
              <h1> Let&apos;s make a new friend at celebee 🐝</h1>
              <h3> Value of together Looking for a companion to be with me</h3>
            </div>
            <Image
              src="/assets/Category_Travel1.png"
              alt="card"
              className="header-image"
            />
          </div>
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
            <FcLike />
            <span className="likes-text">Liked Order</span>
          </button>
        </div>
        <InfiniteScroll
          dataLength={currentInvitations.length}
          next={() => getInvitations(PER_SCROLL)}
          hasMore={true}
          loader={isLoading ? <h4>Loading</h4> : null}
          className="invitation-container"
          scrollThreshold={1}
        >
          {currentInvitations.map((item) => (
            <Link
              key={item.boardId}
              to={`/boards/${item.boardId}`}
              className="invitation-item"
            >
              <div className="invitation-image-container">
                <Image
                  src={item.imageUrl}
                  alt="초대장 이미지"
                  className="invitation-image"
                />
                {/* 호버 시 정보를 표시할 컨테이너 */}
                <div className="invitation-info-container">
                  <span className="likes-count">{item.title}</span>
                  <div className="like-container">
                    <FcLike className="likes_icon" />
                    <span className="invitation-title">
                      {item.boardLikesCount}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </InfiniteScroll>
      </div>
    </HomePage>
  );
}
