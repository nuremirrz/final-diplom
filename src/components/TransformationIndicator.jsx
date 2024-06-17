import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';

const TransformationIndicator = ({selectedYear, selectedDistrict, apiURL}) => {
  const [indicatorData, setIndicatorData] = useState(null);  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiURL}`);
        // const response = await fetch(`${baseURL}/transformation/indicator/${selectedYear}/${selectedDistrict}`);
        const data = await response.json();

        // Обновление состояния компонента с полученными данными
        setIndicatorData(data.data);
      } catch (error) {
        console.error('Ошибка при получении данных из API:', error);        
      }
    };

    // Вызов функции для загрузки данных при монтировании компонента
    fetchData();
  }, [selectedYear, selectedDistrict, apiURL]); // Пустой массив зависимостей означает, что эффект выполнится только при монтировании компонента

  // Отображение данных в вашем компоненте
  return (
    <>
      
      {indicatorData ? (
        <LineChart data={indicatorData} selectedYear={selectedYear} />
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

const LineChart = ({ data, selectedYear }) => {
  // Деструктуризация данных для передачи их в график
  const { distances, area } = data;

  
  
  const chartData = {
    series: [
      {
        name: 'Area',
        data: area,
      }
    ],
    options: {
      title: { text: `Изменения за ${selectedYear} год` },
      colors: ['#2E93fA'],
      xaxis: {
        title: { text: 'Distance (m)' },
        categories: distances,
      },
      yaxis: {
        title: { text: 'Area (m²)' },
      },
    },
  };

  return <Chart type='line' height={550} style={{display: 'flex', justifyContent: 'center', margin: '30px'}} series={chartData.series} options={chartData.options} />;
};

export default TransformationIndicator;
