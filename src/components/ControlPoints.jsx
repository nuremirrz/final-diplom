import React, { useState, useEffect } from 'react';
import { FormControl } from '@mui/base/FormControl';
import { InputLabel, MenuItem, Select } from '@mui/material';
import { baseURL } from '../services/apiConfig';

const ControlPoints = ({selectedControlPoint, onControlPointChange}) => {
    const [controlPoints, setControlPoints] = useState([]);

    useEffect(() => {
        const fetchControlPoints = async () => {
          try {
            const response = await fetch(`${baseURL}/get/control_points`);
            const data = await response.json();
            setControlPoints(data.data);
          } catch (error) {
            console.error('Ошибка при получении районов:', error);
          }
        };
    
        fetchControlPoints();
      }, []);

  return (
    <>
        <FormControl>
        <InputLabel>Select ControlPoint</InputLabel>
        <Select 
          value={selectedControlPoint} 
          onChange={(event) => onControlPointChange(event.target.value)} 
          MenuProps={{ PaperProps: { style: { maxHeight: 300 } } }}
        >
          {controlPoints.map((controlPoint) => (
            <MenuItem key={controlPoint.id} value={controlPoint.id}>
              {controlPoint.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  )
}

export default ControlPoints