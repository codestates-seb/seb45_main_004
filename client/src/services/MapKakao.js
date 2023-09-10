/* eslint-disable no-unused-vars */
/* global kakao */
import { useEffect } from 'react';
import PropTypes from 'prop-types'; // prop-types 라이브러리를 import
// import InviteWritePage from '../pages/InviteWritePage';
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
    const geocoder = new kakao.maps.services.Geocoder();

    const handleSearchButtonClick = () => {
      // showSearch 값이 true일 때만 검색 기능을 사용
      if (showSearch) {
        const input = document.getElementById('address-input');
        const address = input.value;

        // 주소를 검색하여 좌표를 얻어옴
        geocoder.addressSearch(address, (result, status) => {
          if (status === kakao.maps.services.Status.OK) {
            // 마커가 표시될 위치
            const latlng = new kakao.maps.LatLng(result[0].y, result[0].x);

            // 이전 마커가 존재하면 제거
            if (marker) {
              marker.setMap(null);
            }

            // displayMarkerAndInfowindow 함수를 사용하여 마커와 인포윈도우를 생성 및 표시
            marker = displayMarkerAndInfowindow(map, latlng, address);

            // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
            map.setCenter(latlng);

            // 위도, 경도, 주소 정보를 상위 컴포넌트로 전달 // handleLocationSelect 함수가 호출되는 것
            onSelectLocation(latlng.getLat(), latlng.getLng(), address);
          } else {
            alert('주소를 찾을 수 없습니다.');
          }
        });
      }
    };
    if (showMarker && latitude && longitude) {
      const latlngs = new kakao.maps.LatLng(
        parseFloat(latitude),
        parseFloat(longitude),
      );

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
    };
  }, [latitude, longitude, showSearch, showMarker]);

  return (
    <div>
      {showSearch && ( // showSearch가 true일 때만 검색 입력란 및 버튼을 렌더링
        <div className="search-box">
          <input
            type="text"
            id="address-input"
            placeholder="주소를 입력하세요"
            style={{ marginRight: '10px' }}
          />
          <button tabIndex="0" id="search-button">
            검색
          </button>
        </div>
      )}
      <div id="map" style={{ height: '400px' }}></div>
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
