import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';

const ChemicCart = ({ selectedYear, selectedOption, selectedSubOption, pdkUp, pdkDown, tableField, relatedField}) => {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Создаем объект данных для отправки на сервер
        const postData = {
          year: selectedYear,
          table_field: tableField
        };

        // Если выбрана подопция, добавляем соответствующие данные в объект запроса
        if (selectedSubOption) {
          postData.children = selectedSubOption.id;
          postData.related_field = relatedField;
        }

        // Отправляем запрос на сервер
        const response = await fetch('http://80.72.180.130:8581/api/report/get/report', {
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
  }, [selectedYear, selectedOption, selectedSubOption, tableField, relatedField]);


  if (loading) {
    return <p>Loading...</p>;
  }

  if (!response) {
    return <p>No data available</p>;
  }

  const { items, control_points } = response.data;

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
      categories: control_points,
      title: {
        text: 'Control Points',
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
    // Добавление допустимых диапазонов в легенду графика
    legend: {
      labels: {
        fontColor: '#000',
        fontSize: 12,
      },
      onClick: null, // чтобы отключить обработчик клика на легенде
      position: 'top',
      display: true,
      fullWidth: true,
      reverse: false,
      text: [`PDK Up: ${pdkUp}`, `PDK Down: ${pdkDown}`],
    },

  };

  return (
    <div style={{width:'100%'}}>
      <h2>График</h2>
      <div className="chem_container">
        <Chart type='line'  height={550} series={chartSeries} options={chartOptions} />
      </div>
      
    </div>
  );
};

export default ChemicCart;
