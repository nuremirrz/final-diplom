import React, { useState, useEffect } from 'react';
import "../App.css";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Tooltip } from 'react-leaflet';
import { divIcon } from 'leaflet'; // Импортируем divIcon
import { apiEndpoints, baseURL } from '../services/apiConfig';

const MainMap = ({ onMarkerClick, selectedYear, selectedOption, selectedSubOption, tableField, relatedField }) => {
    const [markersData, setMarkersData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const apiUrl = `${baseURL}${apiEndpoints.controlPoints}`;
                const response = await fetch(apiUrl);
                if (!response.ok) {
                    throw new Error(`Ошибка HTTP: ${response.status}`);
                }

                const result = await response.json();                
                const transformedData = result.data.map(item => ({
                    id: item.id,
                    geocode: [
                        parseFloat(item.X_coordinate) || 0,
                        parseFloat(item.Y_coordinate) || 0,
                    ],
                    popUp: item.name,
                    color: item.color,
                }));                
                setMarkersData(transformedData);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const postData = {
                    year: selectedYear,
                    table_field: tableField
                };

                if (selectedSubOption) {
                    postData.children = selectedSubOption.id;
                    postData.related_field = relatedField;
                }

                const response = await fetch(`${baseURL}/get/control_points/withPdk`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(postData)
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const responseData = await response.json();

                setMarkersData(prevMarkersData => prevMarkersData.map(marker => {
                    const updatedMarker = responseData.data.find(dataMarker => dataMarker.id === marker.id);
                    if (updatedMarker) {
                        return {
                            ...marker,
                            color: updatedMarker.color
                        };
                    }
                    return marker;
                }));

                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, [selectedYear, selectedOption, selectedSubOption, tableField, relatedField]);

    if (loading) {
        return <p>Загрузка данных...</p>;
    }

    if (error) {
        return <p>Произошла ошибка: {error}</p>;
    }

    const handleMarkerClick = (id) => {
        onMarkerClick(id);
    };

    const createCustomIcon = (color) => {
        return divIcon({
            className: 'custom-icon', // Стилизуем иконку в CSS
            html: `<svg version="1.0" xmlns="http://www.w3.org/2000/svg"
            width="15.000000pt" height="15.000000pt" viewBox="0 0 712.000000 712.000000"
            preserveAspectRatio="xMidYMid meet">
           
           <g transform="translate(-90.000000,512.000000) scale(0.100000,-0.100000)"
           fill="${color}" stroke="none">
           <path d="M2396 4739 c-120 -11 -299 -50 -415 -91 -619 -219 -1058 -747 -1162
           -1403 -20 -122 -17 -381 4 -490 43 -214 166 -509 318 -767 253 -429 591 -849
           1079 -1340 355 -358 326 -355 619 -65 718 711 1213 1403 1395 1948 66 198 81
           285 80 474 0 288 -60 533 -190 786 -280 542 -810 896 -1419 948 -135 12 -168
           12 -309 0z m336 -863 c165 -32 317 -110 440 -225 192 -180 290 -403 292 -661
           1 -349 -187 -655 -499 -810 -149 -75 -229 -93 -405 -93 -169 0 -251 17 -390
           84 -246 117 -426 339 -492 606 -31 128 -29 304 5 434 88 335 362 596 697 664
           88 18 262 18 352 1z"/>
           <path d="M2405 3551 c-203 -58 -368 -229 -416 -431 -19 -77 -16 -213 5 -285
           57 -194 207 -350 391 -408 98 -31 251 -31 352 1 183 57 332 213 389 408 21 72
           23 208 5 284 -49 206 -221 381 -427 434 -81 21 -222 20 -299 -3z"/>
           </g>`
        });
    };

    return (
        <div className="map__container" style={{ margin: "30px" }}>
            <MapContainer center={[42.44898219069362, 77.12837773897982]} zoom={9.2}>
                <TileLayer
                    attribution='&copy; <a href="https://github.com/cyclosm/cyclosm-cartocss-style/releases" title="CyclOSM - Open Bicycle render">CyclOSM</a> | Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png"
                />
                
                {markersData.map((marker, index) => {
                    if (marker.geocode[0] === null || marker.geocode[1] === null) {
                        return null;
                    }

                    return (
                        <Marker
                            key={`${marker.id}-${marker.color}`} // Уникальный ключ для каждого маркера
                            position={marker.geocode}
                            icon={createCustomIcon(marker.color)} 
                            eventHandlers={{
                                mouseover: () => handleMarkerClick(marker.id)
                            }}
                        >
                            <Tooltip direction="top" offset={[0, -20]} opacity={1} permanent>
                                {marker.popUp}
                            </Tooltip>
                        </Marker>
                    );
                })}

            </MapContainer>
            <h3>Обозначение маркировок:</h3>
            <div style={{display: 'flex'}}>
                <div className="image-container" style={{backgroundImage: `url('./img/placeholder.svg')`, backgroundColor: '#000',paddingLeft: '10px'}}>Нет информации</div>
                <div className="image-container" style={{backgroundImage: `url('./img/placeholder.svg')`, backgroundColor: '#32CD32',paddingLeft: '10px'}}>  Нормально</div>
                <div className="image-container" style={{backgroundImage: `url('./img/placeholder.svg')`, backgroundColor: '#FFFF00',paddingLeft: '10px'}}>  Предупреждение</div>
                <div className="image-container" style={{backgroundImage: `url('./img/placeholder.svg')`, backgroundColor: '#ff0000',paddingLeft: '10px'}}>  Опасность</div>
            </div>
        </div>
    );
};

export default MainMap;
