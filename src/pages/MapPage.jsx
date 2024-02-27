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
    var zoomControl = new kakao.maps.ZoomControl();
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

    const ps = new kakao.maps.services.Places();

    function searchPlaces() {
      const keyword = document.getElementById('keyword').value;
      ps.keywordSearch(keyword, placesSearchCB);
    }

    function placesSearchCB(data, status) {
      if (status === kakao.maps.services.Status.OK) {
        for (let i = 0; i < data.length; i++) {
          displayMarker(data[i]);
        }
        setKeyword('');
      }
    }

    function displayMarker(place) {
      const marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x)
      });

      kakao.maps.event.addListener(marker, 'click', function () {
        const infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
        infowindow.setContent(
          '<div classname="p-2 text-[12px]">' +
            '<div>' +
            place.place_name +
            '</div>' +
            '<button id="reviewButton">리뷰 쓰러 가기>></button>' +
            '</div>'
        );
        infowindow.open(map, marker);
      });
    }

    const searchButton = document.getElementById('searchButton');
    searchButton.addEventListener('click', searchPlaces);

    const keywordInput = document.getElementById('keyword');
    keywordInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        searchPlaces();
      }
    });
  }, []);

  return (
    <div className='mt-5'>
      <div className='mx-auto w-[350px]'>
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
