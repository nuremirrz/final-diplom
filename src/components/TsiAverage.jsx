import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { baseURL } from '../services/apiConfig';


const TsiAverage = ({ selectedYear, selectedDistrict }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${baseURL}/tsi/${selectedYear}/${selectedDistrict}`);
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [selectedYear, selectedDistrict]);

  if (!data) {
    return <div>Loading...</div>;
  }



  // Check if all required elements are present except 'Хлорофилл-А'
  const requiredElements = ['sd_tsi', 'Азот', 'Фосфор минеральный'];
  const missingElements = requiredElements.filter(element => !Object.keys(data.elements).includes(element));

  // If 'Хлорофилл-А' is present, include it in required elements
  if (Object.keys(data.elements).includes('Хлорофилл-А')) {
    requiredElements.push('Хлорофилл-А');
  }

  if (missingElements.length > 0) {
    return <div>Невозможно высчитать среднее значение TSI - отсутствуют следующие элементы: {missingElements.join(', ')}</div>;
  }

  // Calculate average TSI for each control point
  const tsiAverages = data.control_points.map((controlPoint, index) => {
    const sum = requiredElements.reduce((acc, element) => {
      if (data.elements[element]) {
        acc += parseFloat(data.elements[element][index]);
      }
      return acc;
    }, 0);
    return parseFloat((sum / requiredElements.length).toFixed(3)); // Округляем до 3 знаков после запятой
  });

  // Create series data for the chart
  const series = [{
    name: 'Среднее значение TSI',
    data: tsiAverages
  }];

  const options = {
    chart: {
      height: 350,
      type: 'line',
      zoom: {
        enabled: false
      },
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      width: 3,
      curve: 'straight',
      colors: ['#8b00ff'] // Жирный черный цвет линии
    },
    title: {
      text: 'Среднее значение TSI',
      align: 'left'
    },
    xaxis: {
      categories: data.control_points,
    },
    tooltip: {
      y: {
        title: {
          formatter: function (val) {
            return val;
          }
        }
      }
    },
    grid: {
      borderColor: '#f1f1f1',
    }
  };

  return (
    <div style={{ width: '100%', margin: '30px 0' }}>
      <ReactApexChart options={options} series={series} type="line" height={450} />
    </div>
  );
};

export default TsiAverage;
