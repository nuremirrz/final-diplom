import React, { useState } from 'react';
import Navbar from '../components/Navbar'
import DistAndYearChooser from '../components/DistAndYearChooser';
import Tli from '../components/Tli';
import TliAverage from '../components/TliAverage';
import TliTable from '../components/TliTable';
import TliMap from '../components/TliMap';

const TliPage = () => {
  const [selectedYear, setSelectedYear] = useState(2022);
  const [selectedDistrict, setSelectedDistrict] = useState(1);

  const handleYearChange = (year, event) => {
    setSelectedYear(year);
  };

  const handleDistrictChange = (event) => {
    const district = event.target.value;
    setSelectedDistrict(district);
  };

  return (
    <>
      <Navbar
        selectedYear={selectedYear}
        onYearChange={handleYearChange}

      />
      <h1>TLI Page</h1>
      <DistAndYearChooser
        selectedDistrict={selectedDistrict}
        onDistrictChange={handleDistrictChange}
      />
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', margin: '0 40px', gap: '30px'}}>
        <Tli
          selectedYear={selectedYear}
          selectedDistrict={selectedDistrict}
        />
        {/* <h3>Среднее значение TLI</h3> */}
        <TliAverage
        selectedYear={selectedYear}
        selectedDistrict={selectedDistrict}
        />
      </div>
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <TliMap      
        selectedYear={selectedYear}
      />
      <TliTable/>
      </div>
    </>
  )
}

export default TliPage