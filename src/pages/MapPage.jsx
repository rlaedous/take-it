import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const { kakao } = window;

export default function MapPage() {
  const [keyword, setKeyword] = useState('');
  const [currentPosition, setCurrentPosition] = useState(null);
  let markers = [];

  useEffect(() => {
    const container = document.getElementById('map');
    const options = {
      center: new kakao.maps.LatLng(37.51418, 126.94169),
      level: 7
    };
    const map = new kakao.maps.Map(container, options);
    var zoomControl = new kakao.maps.ZoomControl();
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

    const ps = new kakao.maps.services.Places();

    function searchPlaces() {
      const keyword = document.getElementById('keyword').value;
      ps.keywordSearch(keyword, placesSearchCB);
    }

    function placesSearchCB(data, status) {
      removeMarker();
      if (status === kakao.maps.services.Status.OK) {
        for (let i = 0; i < data.length; i++) {
          displayMarker(data[i]);
        }
        setKeyword('');
      } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
        toast.error('검색 결과가 존재하지 않습니다');
        return;
      } else if (status === kakao.maps.services.Status.ERROR) {
        toast.error('검색 결과 중 오류가 발생했습니다');
        return;
      }
    }

    function displayMarker(place) {
      const marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x)
      });
      markers.push(marker); // markers 배열에 추가
      const infowindow = new kakao.maps.InfoWindow(
        {
          content:
            '<div style="padding:5px;font-size:15px;">' +
            place.place_name +
            '<br><a href="https://map.kakao.com/link/map/' +
            place.place_name +
            ',' +
            place.x +
            ',' +
            place.y +
            '" style="color:#DDA0DD" margin-right:5px; target="_blank">큰지도보기</a>' +
            '<br><a href="https://map.kakao.com/link/to/' +
            place.place_name +
            ',' +
            place.x +
            ',' +
            place.y +
            '" style="color:#DDA0DD" target="_blank">길찾기</a></div>',
          zIndex: 1,
          removable: true
        } // 창 닫기 버튼 표시 여부
      );

      kakao.maps.event.addListener(marker, 'click', function () {
        infowindow.open(map, marker);
      });

      // infoWindow 외부를 클릭할 때 infoWindow를 닫도록 이벤트 핸들러 추가
      kakao.maps.event.addListener(map, 'click', function () {
        infowindow.close();
      });
    }
    // 모든 마커를 제거하는 함수
    function removeMarker() {
      for (let i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
      }
      markers = []; // markers 배열 비우기
    }

    const searchButton = document.getElementById('searchButton');
    searchButton.addEventListener('click', searchPlaces);

    const keywordInput = document.getElementById('keyword');
    keywordInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        searchPlaces();
      }
    });
    //내 위치 설정..
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          const currentPosition = new kakao.maps.LatLng(lat, lng);
          map.setCenter(currentPosition);
          setCurrentPosition(currentPosition);
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      toast.error('당신의 위치 정보를 허용해 주세요.');
    }
  }, []);

  return (
    <div className='mt-5'>
      <div className='mx-auto mb-5 w-[350px]'>
        <input
          type='text'
          id='keyword'
          className='w-[300px] p-2'
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder='가게 찾기'
        />
        <button
          className='bg-slate-600 p-2 text-white hover:bg-black '
          id='searchButton'>
          검색
        </button>
      </div>
      <div id='map' className='mx-auto h-[600px] w-[800px]'></div>
    </div>
  );
}
