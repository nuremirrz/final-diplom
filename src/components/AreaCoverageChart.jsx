import React from 'react';
import { Bar } from 'react-chartjs-2';

const AreaCoverageChart = ({ data }) => {
  const areaLabels = ['100м', '200м', '300м'];

  const chartData = {
    labels: areaLabels,
    datasets: [
      {
        label: 'Иссык-Куль',
        data: data['Иссык-Куль'],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Тюп',
        data: data['Тюп'],
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
      {
        label: 'Ак-Суу',
        data: data['Ак-Суу'],
        backgroundColor: 'rgba(255, 205, 86, 0.6)',
        borderColor: 'rgba(255, 205, 86, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    scales: {
      x: {
        type: 'category',
        stacked: true,
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Площадь (м²)',
        },
      },
    },
  };

  return (
    <div>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default AreaCoverageChart;
