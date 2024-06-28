import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import { baseURL } from '../services/apiConfig';

const CalculateChart = ({ selectedYear, selectedDistrict, cost }) => {
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const postData = {
            cost,
            district: selectedDistrict,
            year: selectedYear.toString(),
        };

        const fetchData = async () => {
            try {
                const response = await fetch(`${baseURL}/calculate/horizontal/buffer/zone`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(postData)
                });
                console.log(postData);
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
        
        fetchData();
    }, [selectedYear, selectedDistrict, cost]);
    
    if (loading) {
        return <p>Loading...</p>;
    }

    if (!response) {
        return <p>No data available</p>;
    }


    const { distances, items } = response.data;
    
    // const formattedItems = items.map(item => parseFloat(item));
    // const formattedItems = items;
    const formattedItems = Array.isArray(items) ? items.map(item => parseFloat(item)) : [];

    const chartSeries = [
        {
            name: 'Items',
            data: formattedItems
        }
    ];

    const chartOptions = {
        chart: {
            id: 'line-chart',
            toolbar: {
                show: false
            }
        },
        xaxis: {
            categories: distances,
            title: {
                text: 'Distance (m)',
                style: {
                    fontSize: '14px',
                    fontWeight: 'bold',
                    fontFamily: 'Arial, sans-serif'
                }
            }
        },
        yaxis: {
            title: {
                text: 'Item',
                style: {
                    fontSize: '14px',
                    fontWeight: 'bold',
                    fontFamily: 'Arial, sans-serif'
                }
            }
        }
    };

    return (
        <Chart type='line' width={700} height={550} series={chartSeries} options={chartOptions} style={{display: 'flex', overflowX: 'scroll', overflowY: 'hidden' }} />
    );
};

export default CalculateChart;