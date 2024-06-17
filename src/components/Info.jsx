import React, { useEffect, useState } from 'react';
import TransformationIndicator from './TransformationIndicator';
import { apiEndpoints, baseURL, fullApiUrl } from '../services/apiConfig';

const Info = ({ selectedYear, selectedDistrict }) => {
  const [apiData, setApiData] = useState(null);
  const apiRoute = fullApiUrl(apiEndpoints.transformationIndicator) + `/${selectedYear}/${selectedDistrict}`

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Используем значения selectedYear и selectedDistrict для формирования URL запроса
        const response = await fetch(`${baseURL}/transformation/indicator/${selectedYear}/${selectedDistrict}`);
        console.log(response);
        const data = await response.json();
        setApiData(data.data);
      } catch (error) {
        console.error('Ошибка при получении данных:', error);
      }
    };


    fetchData();
  }, [selectedYear, selectedDistrict]);

  return (
    <>
      <h2>Transformation Indicator Data</h2>
      <TransformationIndicator
        apiURL={apiRoute}
        selectedYear={selectedYear}
        selectedDistrict={selectedDistrict}
        lakeData={apiData} />
        
    </>
  );
};

export default Info;
