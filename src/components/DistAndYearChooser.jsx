import React, { useState, useEffect } from 'react';
import { FormControl } from '@mui/base/FormControl';
import { InputLabel, MenuItem, Select } from '@mui/material';
import { baseURL } from '../services/apiConfig';

const DistAndYearChooser = ({ selectedYear, selectedDistrict, onYearChange, onDistrictChange}) => {
    const [districts, setDistricts] = useState([]);
    // const years = Array.from({ length: 35 }, (_, index) => 1990 + index);

    useEffect(() => {
        const fetchDistricts = async () => {
            try {
                const response = await fetch(`${baseURL}/get/districts/1`);
                const data = await response.json();
                setDistricts(data.data);
            } catch (error) {
                console.error('Ошибка при получении районов:', error);
            }
        };

        fetchDistricts();
    }, []);
    return (
        <>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly', gap: '30px', alignItems: 'center', margin: '30px' }}>
                {/* <FormControl>
                    <InputLabel>Select Year</InputLabel>
                    <Select value={selectedYear} onChange={onYearChange} MenuProps={{ PaperProps: { style: { maxHeight: 300 } } }}>
                        {years.map((year) => (
                            <MenuItem key={year} value={year}>
                                {year}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl> */}

                <FormControl>
                    <InputLabel>Выберите район</InputLabel>
                    <Select value={selectedDistrict} onChange={onDistrictChange} style={{ border: '3px solid #00b050'}}>
                        {districts.map((district) => (
                            <MenuItem key={district.id} value={district.id}>
                                {district.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>
        </>
    )
}

export default DistAndYearChooser