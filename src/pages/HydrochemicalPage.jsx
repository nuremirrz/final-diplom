import React, { useState } from 'react';
import NavBar from '../components/Navbar';
import NestedDropdown from '../components/NestedDropdown';
import ChemicCart from '../components/ChemicCart';

const HydrochemicalPage = () => {
  const [selectedYear, setSelectedYear] = useState(2022);
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedSubOption, setSelectedSubOption] = useState('');  
  const [pdkUp, setPdkUp] = useState(null);
  const [pdkDown, setPdkDown] = useState(null);  
  const [tableField, setTableField] = useState(null);  
  const [relatedField, setRelatedField] = useState(null);
  const [pdkUpForSubOption, setPdkUpForSubOption] = useState(null);
  const [pdkDownForSubOption, setPdkDownForSubOption] = useState(null);

  const handleYearChange = (year) => {
    setSelectedYear(year);
  };

  const handleOptionChange = (optionId, tableField, relatedField, pdk_up, pdk_down) => {
    setSelectedOption(optionId);  
    setTableField(tableField); 
    setRelatedField(relatedField); 
    setPdkUp(pdk_up);
    setPdkDown(pdk_down);
  };

  const handleSubOptionChange = (subOptionName, pdk_up, pdk_down) => {
    setSelectedSubOption(subOptionName);
    setPdkUpForSubOption(pdk_up);
    setPdkDownForSubOption(pdk_down);
  };

    
  return (
    <>
      <NavBar 
      selectedYear={selectedYear}
      onYearChange={handleYearChange}
      />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', margin: '0 40px'}}>
        <NestedDropdown
          onYearChange={handleYearChange}
          onOptionChange={handleOptionChange}
          onSubOptionChange={handleSubOptionChange}                     
          pdkUp={pdkUp}
          pdkDown={pdkDown}         
        />
        <ChemicCart
          selectedYear={selectedYear}
          selectedOption={selectedOption}
          selectedSubOption={selectedSubOption}
          tableField={tableField}
          
          pdkUp={pdkUp}
          pdkDown={pdkDown}     
          relatedField={relatedField}  
          pdkUpForSubOption={pdkUpForSubOption}
          pdkDownForSubOption={pdkDownForSubOption}          
        />
      </div>
    </>
  );
};

export default HydrochemicalPage;