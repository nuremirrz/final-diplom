import React from 'react';

const TsiTable = () => {
  const tableData = [
    { tsi: 0, sd: 64, tp: 0.75, chla: 0.04, tn: 0.02, category: 'Ultraoligotrophic' },
    { tsi: 10, sd: 32, tp: 1.5, chla: 0.12, tn: 0.05, category: 'Ultraoligotrophic' },
    { tsi: 20, sd: 16, tp: 3, chla: 0.34, tn: 0.09, category: 'Ultraoligotrophic' },
    { tsi: 30, sd: 8, tp: 6, chla: 0.94, tn: 0.18, category: 'Oligotrophic' },
    { tsi: 40, sd: 4, tp: 12, chla: 2.6, tn: 0.37, category: 'Oligotrophic' },
    { tsi: 45, sd: 2.8, tp: 17, chla: 5, tn: 0.52, category: 'Mesotrophic' },
    { tsi: 50, sd: 2, tp: 24, chla: 6.4, tn: 0.74, category: 'Mesotrophic' },
    { tsi: 53, sd: 1.6, tp: 30, chla: 10, tn: 0.92, category: 'Eutrophic' },
    { tsi: 60, sd: 1, tp: 48, chla: 20, tn: 1.47, category: 'Eutrophic' },
    { tsi: 70, sd: 0.5, tp: 96, chla: 56, tn: 2.94, category: 'Hypereutrophic' },
    { tsi: 80, sd: 0.25, tp: 192, chla: 154, tn: 5.89, category: 'Hypereutrophic' },
    { tsi: 90, sd: 0.12, tp: 384, chla: 427, tn: 11.7, category: 'Hypereutrophic' },
    { tsi: 100, sd: 0.062, tp: 768, chla: 1183, tn: 23.6, category: 'Hypereutrophic' },
  ];

  return (
    <div className="table-container">
      <h2>TSI Classifications</h2>
      <table className="styled-table">
        <thead>
          <tr>
            <th>TSI</th>
            <th>SD (m)</th>
            <th>TP (μg P/L)</th>
            <th>Chl-a (μg/L)</th>
            <th>TN (mg N/L)</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => (
            <tr key={index}>
              <td>{row.tsi}</td>
              <td>{row.sd}</td>
              <td>{row.tp}</td>
              <td>{row.chla}</td>
              <td>{row.tn}</td>
              <td>{row.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TsiTable;
