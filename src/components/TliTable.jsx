import React from 'react';

const TliTable = () => {
  const tableData = [
    { tli: '0.0 to 1.0', chla: '0.13–0.33', sd: '31–34', tp: '0.84–1.8', tn: '16–34', category: 'Ultra-microtrophic' },
    { tli: '1.0 to 2.0', chla: '0.33–0.82', sd: '24–15', tp: '1.8–4.1', tn: '34–73', category: 'Microtrophic' },
    { tli: '2.0 to 3.0', chla: '0.82–2.0', sd: '15–7.8', tp: '4.1–9.0', tn: '73–157', category: 'Oligotrophic' },
    { tli: '3.0 to 4.0', chla: '2.0–5.0', sd: '7.8–3.6', tp: '9.0–20', tn: '157–337', category: 'Mesotrophic' },
    { tli: '4.0 to 5.0', chla: '5.0–12', sd: '3.6–1.6', tp: '20–43', tn: '337–725', category: 'Eutrophic' },
    { tli: '5.0 to 6.0', chla: '12–31.0', sd: '1.6–0.7', tp: '43–96', tn: '725–1558', category: 'Supertrophic' },
    { tli: '6.0 to 7.0', chla: '> 31', sd: '< 0.7', tp: '> 96', tn: '> 1558', category: 'Hypertrophic' },
  ];

  return (
    <div className="table-container">
      <h2>TLI Classifications</h2>
      <table className="styled-table">
        <thead>
          <tr>
            <th>TLI</th>
            <th>Chl-a (mg/m³)</th>
            <th>SD (m)</th>
            <th>TP (mg P/m³)</th>
            <th>TN (mg N/m³)</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => (
            <tr key={index}>
              <td>{row.tli}</td>
              <td>{row.chla}</td>
              <td>{row.sd}</td>
              <td>{row.tp}</td>
              <td>{row.tn}</td>
              <td>{row.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TliTable;
