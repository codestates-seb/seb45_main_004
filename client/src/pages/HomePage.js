import { styled } from 'styled-components';
import { FaSearch } from 'react-icons/fa';
import CategoryBtn from '../components/CategoryBtn';
import CategoryMappings from '../components/CategoryMappings';
import { useState } from 'react';
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
  const [invitation, setInvitation] = useState([]);

  const fetchMoreData = () => {
    axios

      .get('http://3.39.76.109:8080/boards')

      .then((response) => {
        const newData = response.data;
        const sortedInvitation = newData.sort(
          (a, b) => new Date(b.boardId) - new Date(a.boardId),
        );

        const uniqueSortedInvitation = sortedInvitation.filter((item) => {
          return !invitation.find(
            (existingItem) => existingItem.boardId === item.boardId,
          );
        });

        const updateInvitation = [...invitation, ...uniqueSortedInvitation];
        setInvitation(updateInvitation);
      })

      .catch((error) => {
        console.log('error', error);
      });
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
            {Object.keys(CategoryMappings).map((key) => (
              <CategoryBtn
                key={key}
                text={CategoryMappings[key]?.label}
                color={
                  CategoryMappings[key]?.backgroundColor ||
                  CategoryMappings[key]?.color
                }
              />
            ))}
          </ul>
        </div>
        <div className="search-container">
          <div className="search">
            <input
              type="text"
              id="search"
              placeholder="Search"
              className="search-text"
            />
            <SearchBtn className="icon-search">
              <FaSearch />
            </SearchBtn>
          </div>
        </div>
        <InfiniteScroll
          dataLength={invitation.length}
          next={fetchMoreData}
          hasMore={true}
          loader={invitation.length > 0 ? null : <h4>Loading</h4>}
          className="invitation-container"
        >
          {invitation.map((item) => (
            <Link
              key={item.boardId}
              to={`/boards/${item.boardId}`}
              className="invitation-item"
            >
              <h2>{item.title}</h2>
            </Link>
          ))}
        </InfiniteScroll>
      </div>
    </HomePage>
  );
}
