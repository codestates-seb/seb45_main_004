import { styled } from 'styled-components';
import { FaSearch } from 'react-icons/fa';
import CategoryBtn from '../components/CategoryBtn';
import categoryMappings from '../components/categoryMappings';
import { useEffect, useState } from 'react';
import axios from 'axios';

const HomePage = styled.div`
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
  .search {
    padding-left: 30px;
  }
  .icon-search {
    padding-right: 10px;
  }
  .categorys-container {
    display: flex;
    flex-direction: row;
    list-style: none;
    justify-content: center;
    padding: 0;
    margin: 20px 0px;
  }
  .invitiation-container {
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

export default function Homepage() {
  const [invitiation, setInvitiation] = useState([]);

  useEffect(() => {
    axios
      .get('http://3.39.76.109:8080/boards')

      .then((response) => {
        const newData = response.data;
        setInvitiation(newData);
        console.log(newData);
      })

      .catch((error) => {
        console.log('error', error);
      });
  }, []);

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
            {Object.keys(categoryMappings).map((key) => (
              <CategoryBtn
                key={key}
                text={categoryMappings[key]?.label}
                color={
                  categoryMappings[key]?.backgroundColor ||
                  categoryMappings[key]?.color
                }
              />
            ))}
          </ul>
        </div>
        <div className="search-container">
          <div className="search">
            <span className="search-text">Search</span>
            <div className="icon-search">
              <FaSearch />
            </div>
          </div>
        </div>
        <div className="invitiation-container">
          {invitiation.map((item) => (
            <div key={item.boardId} className="invitation-item">
              <h2>{item.title}</h2>
            </div>
          ))}
        </div>
      </div>
    </HomePage>
  );
}
