import React, { useState } from 'react';
import Navbar from '../components/Navbar'
import DistAndYearChooser from '../components/DistAndYearChooser'
import Tsi from '../components/Tsi'
import TsiAverage from '../components/TsiAverage';
import TsiTable from '../components/TsiTable';
import TsiMap from '../components/TsiMap';

const TsiPage = () => {
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
            <h1>TSI Page</h1>
            <DistAndYearChooser
                selectedDistrict={selectedDistrict}
                onDistrictChange={handleDistrictChange}
            />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', margin: '0 40px', gap: '30px' }}>
                <Tsi
                    selectedYear={selectedYear}
                    selectedDistrict={selectedDistrict}
                />
                {/* <h3>Среднее значение TSI</h3> */}
                <TsiAverage
                    selectedYear={selectedYear}
                    selectedDistrict={selectedDistrict}
                />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <TsiMap
                    selectedYear={selectedYear}
                />
                <TsiTable />
            </div>

        </>
    )
}

export default TsiPage