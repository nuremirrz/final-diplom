import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import SvCalculator from '../components/SvCalculator';
import Header from '../components/Header';
import CalculateChart from '../components/CalculateChart';

const CalculatorPage = () => {
  const [selectedYear, setSelectedYear] = useState(2022);
  const [selectedDistrict, setSelectedDistrict] = useState(1);
  const [cost, setCost] = useState(18448000);

  const handleYearChange = (year, event) => {
    setSelectedYear(year);
  };

  const handleDistrictChange = (event) => {
    const district = event.target.value;
    setSelectedDistrict(district);
  };
  
  const handleCostChange = (cost) => {
    setCost(cost);
    console.log(cost)
  };
  return (
    <>
      <Navbar
        selectedYear={selectedYear}
        onYearChange={handleYearChange}      
      />
      <Header
        selectedDistrict={selectedDistrict}
        onDistrictChange={handleDistrictChange}
      />
      <div style={{ display: 'flex',  alignItems: 'center', justifyContent: 'space-evenly',  flexWrap: 'wrap', margin: '30px'}}>
        <CalculateChart 
          selectedYear={selectedYear} 
          selectedDistrict={selectedDistrict} 
          cost={cost}
        />
        <SvCalculator
          onCostChange={handleCostChange}
        />
      </div>
    </>
  )
}

export default CalculatorPage;
