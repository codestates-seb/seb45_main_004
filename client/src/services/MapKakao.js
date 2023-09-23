/* eslint-disable no-unused-vars */
/* global kakao */
import { useEffect } from 'react';
import PropTypes from 'prop-types';
const { kakao } = window;

function MapKakao({
  onSelectLocation,
  latitude,
  longitude,
  showSearch,
  showMarker,
}) {
  // 장소 검색 결과로 마커와 인포윈도우를 표시하는 함수
  function displayMarkerAndInfowindow(map, latlng, address) {
    const marker = new kakao.maps.Marker({
      map: map,
      position: latlng,
    });

    const iwContent = `<div style="
    text-align: center;
    max-width: 500px;
    width: 160px;
    background-color: #fff;
    border: 1px solid ;
    background-color: 
    border-radius: 2px;
    box-shadow: 2px 2px 2px rgba(1, 0, 0, 2);
    padding: 5px;
    font-size: 14px; 
    ">${address}</div>`;
    const infowindow = new kakao.maps.InfoWindow({
      content: iwContent,
    });

    kakao.maps.event.addListener(marker, 'mouseover', function () {
      infowindow.open(map, marker);
    });

    kakao.maps.event.addListener(marker, 'mouseout', function () {
      infowindow.close();
    });

    return marker;
  }

  useEffect(() => {
    // 카카오 지도 초기화
    const mapContainer = document.getElementById('map');
    const mapOption = {
      center: new kakao.maps.LatLng(37.4843898112464, 127.124948516572), // 초기 중심 좌표
      level: 3, // 지도의 확대 레벨
    };

    // 지도 생성
    const map = new kakao.maps.Map(mapContainer, mapOption);
    let marker = null; // 이전 마커 인스턴스를 추적하기 위한 변수

    // 장소 검색 객체 생성
    const places = new kakao.maps.services.Places(); // 키워드 검색 서비스 생성

    const handleSearchButtonClick = () => {
      const input = document.getElementById('address-input');
      const keyword = input.value;
      places.keywordSearch(keyword, (result, status) => {
        const listings = document.getElementById('listings');
        const markers = []; // 검색 결과에 대한 모든 마커를 저장할 배열
        const toggleButton = document.getElementById('toggleButton');

        if (status === kakao.maps.services.Status.OK) {
          listings.innerHTML = '';
          listings.classList.add('filled'); // 내용이 있을 때 filled 클래스 추가
          input.value = '';

          toggleButton.onclick = () => {
            if (
              listings.style.display === 'none' ||
              listings.style.display === ''
            ) {
              listings.style.display = 'block';
              toggleButton.innerText = '목록 숨기기';
            } else {
              listings.style.display = 'none';
              toggleButton.innerText = '목록 표시하기';
            }
          };

          result.forEach((item) => {
            const latlng = new kakao.maps.LatLng(item.y, item.x);

            const tempMarker = displayMarkerAndInfowindow(
              map,
              latlng,
              `${item.place_name} (${item.address_name})`,
            );

            markers.push(tempMarker); // 마커 배열에 추가

            const el = document.createElement('div');
            el.innerHTML = `${item.place_name} (${item.address_name})`;
            el.classList.add('search-result-item');
            el.onclick = () => {
              if (marker) {
                marker.setMap(null);
              }

              const selectedItems = document.querySelectorAll(
                '.search-result-item.selected-item',
              );
              selectedItems.forEach((item) => {
                item.classList.remove('selected-item');
              });
              el.classList.add('selected-item');

              // 사용자가 목록 중 하나를 클릭하면, 나머지 마커는 삭제합니다.
              markers.forEach((m) => m.setMap(null));

              marker = displayMarkerAndInfowindow(map, latlng, item.place_name);

              map.setCenter(latlng);
              onSelectLocation(
                latlng.getLat(),
                latlng.getLng(),
                item.place_name,
              );
            };
            listings.appendChild(el);
          });
          // listings.appendChild(toggleButton);
          listings.style.display = 'block'; // listings 숨기기
        } else {
          listings.innerHTML = '';
          listings.classList.remove('filled');
          alert('검색 결과가 없습니다.');
        }
      });
    };

    //엔터 검색
    const handleEnterPress = (e) => {
      if (e.key === 'Enter' && showSearch) {
        e.preventDefault();
        handleSearchButtonClick();
      }
    };

    if (showMarker && latitude && longitude) {
      const latlngs = new kakao.maps.LatLng(latitude, longitude);
      const geocoder = new kakao.maps.services.Geocoder();

      // 좌표를 주소로 변환
      geocoder.coord2Address(
        latlngs.getLng(),
        latlngs.getLat(),
        (result, status) => {
          if (status === kakao.maps.services.Status.OK) {
            const address = result[0].address.address_name;

            // 이전 마커가 존재하면 제거
            if (marker) {
              marker.setMap(null);
            }

            // displayMarkerAndInfowindow 함수를 사용하여 마커와 인포윈도우를 생성 및 표시
            marker = displayMarkerAndInfowindow(map, latlngs, address);

            // 지도의 중심을 결과값으로 받은 위치로 이동
            map.setCenter(latlngs);
          }
        },
      );
    }

    // 엔터 키 이벤트 리스너 추가
    const addressInput = document.getElementById('address-input');
    if (addressInput) {
      addressInput.addEventListener('keydown', handleEnterPress);
    }
    // 검색 버튼 이벤트 리스너 추가
    const searchButton = showSearch
      ? document.getElementById('search-button')
      : null;
    if (searchButton) {
      searchButton.addEventListener('click', handleSearchButtonClick);
    }
    return () => {
      if (searchButton) {
        searchButton.removeEventListener('click', handleSearchButtonClick);
      }
      if (addressInput) {
        addressInput.removeEventListener('keydown', handleEnterPress);
      }
    };
  }, [latitude, longitude, showSearch, showMarker]);

  return (
    <div>
      <div id="map" style={{ height: '400px' }}>
        {showSearch && (
          <div className="search-box">
            <input
              type="text"
              id="address-input"
              placeholder="주소를 입력해주세요."
              style={{ marginRight: '10px' }}
            />
            <button tabIndex="0" id="search-button">
              검색
            </button>
          </div>
        )}
        <button id="toggleButton">검색 목록</button>
        <div id="listings" className="search-results"></div>
      </div>
    </div>
  );
}

MapKakao.propTypes = {
  onSelectLocation: PropTypes.func,
  latitude: PropTypes.number,
  longitude: PropTypes.number,
  showSearch: PropTypes.bool,
  showMarker: PropTypes.bool,
};
export default MapKakao;
