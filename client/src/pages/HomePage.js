import { styled } from 'styled-components';
import { FaSearch } from 'react-icons/fa';

const HomePage = styled.div`
  margin: 0;
  display: flex;
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
    width: 600px;
    height: 55px;
    border: solid 1px black;
    border-radius: 10px;
    align-items: center;
    justify-content: space-between;
    margin-top: 176px;
  }
  .search {
    padding-left: 30px;
  }
  .icon-search {
    padding-right: 10px;
  }
`;

// const CategoryBtn = styled.div``;

export default function Homepage() {
  return (
    <HomePage>
      <div className="main-container">
        <div className="main-header">
          <h1 className="service-introduction">
            Hi! Make new friends at Celebee 🐝
          </h1>
        </div>
        <div className="categorys-container">{/* 카테고리 컴포넌트 */}</div>
        <div className="search-container">
          <span className="search">Search</span>
          <div className="icon-search">
            <FaSearch />
          </div>
        </div>
        <div className="invitiation-container">{/* 초대장 컴포넌트 */}</div>
      </div>
    </HomePage>
  );
}
