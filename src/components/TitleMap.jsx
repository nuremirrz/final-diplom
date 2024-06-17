import React from 'react';
import { MapContainer, TileLayer} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const TitleMap = () => {
  return (
    <MapContainer center={[42.44898219069362, 77.12837773897982]} zoom={9.3} style={{ height: '450px', width: '100%' }}>
      <TileLayer
        attribution='&copy; <a href="https://github.com/cyclosm/cyclosm-cartocss-style/releases" title="CyclOSM - Open Bicycle render">CyclOSM</a> | Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png"
        />     
    </MapContainer>
  );
}

export default TitleMap;
