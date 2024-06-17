import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';

const NestedDropdown = ({ onOptionChange, onSubOptionChange }) => {
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  const [subOptions, setSubOptions] = useState([]);
  const [selectedSubOption, setSelectedSubOption] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://80.72.180.130:8581/api/report/get/fields');
        setOptions(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleOptionChange = (event, optionId) => {
    if (optionId !== null) {
      setSelectedOption(optionId);

      const selectedOptionData = options.find(option => option.field === optionId);
      const { pdk_up, pdk_dawn, table_field, related_field } = selectedOptionData || {};
      setSubOptions(selectedOptionData?.children || []);
      onOptionChange(optionId, table_field, related_field, pdk_up, pdk_dawn);
    }
  };

  const handleSubOptionChange = (event, subOptionId) => {
    if (subOptionId !== null) {
      const selectedSubOptionData = subOptions.find(subOption => subOption.id === subOptionId);
      setSelectedSubOption(selectedSubOptionData);
      const pdkUpForSubOption = selectedSubOptionData ? selectedSubOptionData.pdk_up : null;
      const pdkDownForSubOption = selectedSubOptionData ? selectedSubOptionData.pdk_dawn : null;
      onSubOptionChange(selectedSubOptionData, pdkUpForSubOption, pdkDownForSubOption);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-evenly', margin: '30px 0',gap: '30px'}}>
      <div style={{ display: 'flex', flexDirection: 'column'}}>
        <ToggleButtonGroup
          value={selectedOption}
          exclusive
          onChange={handleOptionChange}
          aria-label="select option"
          orientation="vertical"
        >
          {loading ? (
            <ToggleButton disabled>Loading...</ToggleButton>
          ) : (
            options.map((option) => (
              <ToggleButton key={option.field} value={option.field} style={{ whiteSpace: 'normal',  border: '2px solid #00b050' }}>
                {option.field}
              </ToggleButton>
            ))
          )}
        </ToggleButtonGroup>
      </div>
      {subOptions.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <ToggleButtonGroup
            value={selectedSubOption ? selectedSubOption.id : null}
            exclusive
            onChange={handleSubOptionChange}
            aria-label="select sub-option"
            orientation="vertical"            
          >
            {subOptions.map((subOption) => (
              <ToggleButton key={subOption.id} value={subOption.id} style={{ whiteSpace: 'normal', border: '2px solid #00b050' }}>
                <span dangerouslySetInnerHTML={{ __html: subOption.name }} />
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </div>
      )}
    </div>
  );
};

export default NestedDropdown;
