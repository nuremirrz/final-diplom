import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Header from '../components/Header'
import Info from '../components/Info'

const InfoPage = () => {
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
      <Header
        selectedDistrict={selectedDistrict}
        onDistrictChange={handleDistrictChange}  
        // selectedYear={selectedYear}
        // onYearChange={handleYearChange}      
      />
      <Info
        selectedYear={selectedYear}
        selectedDistrict={selectedDistrict}        
      />   
    </>
  )
}

export default InfoPage