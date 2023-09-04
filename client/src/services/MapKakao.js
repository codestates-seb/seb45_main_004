// /* eslint-disable no-unused-vars */
// /* global kakao */
// import { useEffect } from 'react';
// import PropTypes from 'prop-types'; // prop-types 라이브러리를 import
// // import InviteWritePage from '../pages/InviteWritePage';
// const { kakao } = window;

// function MapKakao({
//   onSelectLocation,
//   latitude,
//   longitude,
//   showSearch,
//   showMarker,
// }) {
//   useEffect(() => {
//     // 카카오 지도 초기화
//     const mapContainer = document.getElementById('map');
//     const mapOption = {
//       center: new kakao.maps.LatLng(37.4843898112464, 127.124948516572), // 초기 중심 좌표
//       level: 3, // 지도의 확대 레벨
//     };

//     // 지도 생성
//     const map = new kakao.maps.Map(mapContainer, mapOption);
//     let marker = null; // 이전 마커 인스턴스를 추적하기 위한 변수

//     // 장소 검색 객체 생성
//     const geocoder = new kakao.maps.services.Geocoder();

//     const handleSearchButtonClick = () => {
//       // showSearch 값이 true일 때만 검색 기능을 사용
//       if (showSearch) {
//         const input = document.getElementById('address-input');
//         const address = input.value;

//         // 주소를 검색하여 좌표를 얻어옴
//         geocoder.addressSearch(address, (result, status) => {
//           if (status === kakao.maps.services.Status.OK) {
//             // 마커가 표시될 위치
//             const latlng = new kakao.maps.LatLng(result[0].y, result[0].x);

//             // 이전 마커가 존재하면 제거
//             if (marker) {
//               marker.setMap(null);
//             }

//             // 새로운 마커 생성
//             marker = new kakao.maps.Marker({
//               map: map,
//               position: latlng,
//             });

//             // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
//             map.setCenter(latlng);

//             // 위도, 경도, 주소 정보를 상위 컴포넌트로 전달 // handleLocationSelect 함수가 호출되는 것
//             onSelectLocation(latlng.getLat(), latlng.getLng(), address);
//           } else {
//             alert('주소를 찾을 수 없습니다.');
//           }
//         });
//       }
//     };
//     if (showMarker) {
//       const latlngs = new kakao.maps.LatLng(
//         parseFloat(latitude),
//         parseFloat(longitude),
//       );
//       console.log(latlngs);

//       // 새로운 마커 생성
//       marker = new kakao.maps.Marker({
//         map: map,
//         position: latlngs,
//       });

//       // 지도의 중심을 결과값으로 받은 위치로 이동
//       map.setCenter(latlngs);
//     }

//     const searchButton = showSearch
//       ? document.getElementById('search-button')
//       : null;
//     if (searchButton) {
//       searchButton.addEventListener('click', handleSearchButtonClick);
//     }
//     // 컴포넌트가 언마운트될 때 이벤트 핸들러를 제거
//     // return () => {
//     //   searchButton.removeEventListener('click', handleSearchButtonClick);
//     // };
//   }, [latitude, longitude, showSearch, showMarker]);

//   return (
//     <div>
//       {showSearch && ( // showSearch가 true일 때만 검색 입력란 및 버튼을 렌더링
//         <>
//           <input
//             type="text"
//             id="address-input"
//             placeholder="주소를 입력하세요"
//             style={{ marginRight: '10px' }}
//           />
//           <button id="search-button">검색</button>
//         </>
//       )}
//       <div id="map" style={{ width: '600px', height: '600px' }}></div>
//     </div>
//   );
// }

// MapKakao.propTypes = {
//   onSelectLocation: PropTypes.func,
//   latitude: PropTypes.number,
//   longitude: PropTypes.number,
//   showSearch: PropTypes.bool,
//   showMarker: PropTypes.bool,
// };
// export default MapKakao;
