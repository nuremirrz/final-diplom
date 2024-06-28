import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import { baseURL } from '../services/apiConfig';

const ElementsChart = ({selectedControlPointId, tableField, relatedField, selectedOption, selectedSubOption}) => {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Создаем объект данных для отправки на сервер
        const postData = {
            control_point_id: selectedControlPointId,
            table_field: tableField
        };

        // Если выбрана подопция, добавляем соответствующие данные в объект запроса
        if (selectedSubOption) {
          postData.children = selectedSubOption.id;
          postData.related_field = relatedField;
        }

        // Отправляем запрос на сервер
        const response = await fetch(`${baseURL}/report/get/point/report`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(postData)
        });
        console.log(postData)
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const responseData = await response.json();
        setResponse(responseData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData(); // Вызываем функцию получения данных при изменении выбора
  }, [selectedOption, selectedSubOption, tableField, relatedField, selectedControlPointId]);


  if (loading) {
    return <p>Loading...</p>;
  }

  if (!response) {
    // return <p>No data available</p>;
    return <p></p>;
  }

  const { items, years } = response.data;

  const chartSeries = [
    {
      name: 'Items',
      data: items
    }
  ];

  const chartOptions = {
    chart: {
      id: 'bar-chart',
      toolbar: {
        show: false
      }
    },
    xaxis: {
      categories: years,
      title: {
        text: 'Years',
        style: {
          fontSize: '14px',
          fontWeight: 'bold',
          fontFamily: 'Arial, sans-serif'
        }
      }
    },
    yaxis: {
      title: {
        text: 'Items',
        style: {
          fontSize: '14px',
          fontWeight: 'bold',
          fontFamily: 'Arial, sans-serif'
        }
      }
    },
    plotOptions: {
      bar: {
        horizontal: false
      }
    },
  };


    return (
        <div>
            <h2>Elements Chart</h2>
            <div>
                <Chart
                    options={chartOptions}
                    series={chartSeries}
                    type="line"
                    width={"300%"}
                    height={550}
                />
            </div>
        </div>
    );
};

export default ElementsChart;
