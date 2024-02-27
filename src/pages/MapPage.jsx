import { useEffect, useState } from 'react';

const { kakao } = window;

export default function MapPage() {
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    const container = document.getElementById('map');
    const options = {
      center: new kakao.maps.LatLng(37.51418, 126.94169),
      level: 7
    };
    const map = new kakao.maps.Map(container, options);

    // 장소 검색 객체를 생성합니다
    const ps = new kakao.maps.services.Places();

    // 키워드로 장소를 검색하는 함수
    function searchPlaces() {
      // 검색할 키워드를 가져옵니다
      const keyword = document.getElementById('keyword').value;

      // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
      ps.keywordSearch(keyword, placesSearchCB);
    }

    // 키워드 검색 완료 시 호출되는 콜백함수
    function placesSearchCB(data, status) {
      if (status === kakao.maps.services.Status.OK) {
        for (let i = 0; i < data.length; i++) {
          displayMarker(data[i]);
        }
      }
    }

    // 지도에 마커를 표시하는 함수
    function displayMarker(place) {
      // 마커를 생성하고 지도에 표시합니다
      const marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x)
      });

      // 마커에 클릭 이벤트를 등록합니다
      kakao.maps.event.addListener(marker, 'click', function () {
        // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
        const infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
        infowindow.setContent(
          '<div style="padding:5px;font-size:12px;">' +
            place.place_name +
            '</div>'
        );
        infowindow.open(map, marker);
      });
    }

    // 검색 버튼 클릭 시 검색을 수행합니다
    const searchButton = document.getElementById('searchButton');
    searchButton.addEventListener('click', searchPlaces);
  }, []);

  return (
    <div>
      <div>
        <input
          type='text'
          id='keyword'
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder='장소를 입력하세요.'
        />
        <button id='searchButton'>검색</button>
      </div>
      <div
        id='map'
        style={{
          width: '500px',
          height: '500px'
        }}></div>
    </div>
  );
}
