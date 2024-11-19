import React from 'react';

interface TableProps {
    headers: string[];
    rows: React.ReactNode[][];
  }

const Table: React.FC<TableProps> = ({ headers, rows }) => (
  <div className="overflow-x-auto">
    <table className="min-w-full bg-white shadow-md rounded-lg">
      <thead className="bg-blue-500 text-white">
        <tr>
          {headers.map((header, index) => (
            <th key={index} className="px-4 py-2">{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, index) => (
          <tr key={index} className="border-t">
            {row.map((cell, cellIndex) => (
              <td key={cellIndex} className="px-4 py-2">{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default Table;
