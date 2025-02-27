import React from 'react';

const TableComponent = ({ layoutId, rows, cols }) => (
  <div className="overflow-x-auto w-full h-full">
    <table className="table-auto w-full h-full border-collapse border border-gray-200" id={layoutId}>
      <tbody>
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <tr key={rowIndex}>
            {Array.from({ length: cols }).map((_, colIndex) => (
              <td key={colIndex} className="border border-gray-200 p-2"></td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);


export default TableComponent;
