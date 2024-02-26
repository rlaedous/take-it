import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import axios from 'axios';

const BarChart = () => {
  const [chartData, setChartData] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          'https://tungsten-flossy-van.glitch.me/surveyResults'
        );
        console.log(data);

        if (Array.isArray(data)) {
          // 각 surveyResults에 대해 반복
          data.forEach((result) => {
            if (
              result &&
              result.selectedGifts &&
              Array.isArray(result.selectedGifts)
            ) {
              const selectedGifts = result.selectedGifts;

              // 각 selectedGifts에 대해 반복하여 id를 출력하거나 수집
              selectedGifts.forEach((gift) => {
                if (gift && gift.id !== undefined) {
                  // id 속성이 정의되어 있는지 확인
                  const giftId = gift.id;
                  console.log(`선물 ID: ${giftId}`);
                  // 여기서 통계를 낼 수 있습니다.
                }
              });
            }
          });
        }

        return data;
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  });

  return (
    <div>
      <h2>Top 5 Gifts</h2>
    </div>
  );
};

export default BarChart;
