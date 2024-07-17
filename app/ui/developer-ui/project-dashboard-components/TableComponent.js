import React from 'react';

const TableComponent = ({ data, layoutId }) => (
  <div className="overflow-x-auto">
    <table className="table-auto w-full border-collapse border border-gray-200" layoutId={layoutId}>
      <thead>
        <tr>
          {Object.keys(data[0]).map((key) => (
            <th key={key} className="border border-gray-200 px-4 py-2">{key}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            {Object.values(row).map((value, i) => (
              <td key={i} className="border border-gray-200 px-4 py-2">{value}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default TableComponent;
