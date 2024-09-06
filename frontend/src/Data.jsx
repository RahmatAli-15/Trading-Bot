import React, { useEffect, useState } from 'react';
import Axios from 'axios';

const Data = () => {
  const [data, setData] = useState("");

  const getData = async () => {
    try {
      const response = await Axios.get("http://localhost:5000/api/run-strategies");
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setData("Error fetching data");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // Convert data to table rows (assuming the data is in a newline-separated format)
  const dataRows = data.split('\n').map((row, index) => (
    <tr key={index} className="hover:bg-gray-100 transition-colors duration-200">
      <td className="border-b px-4 py-2">{row}</td>
    </tr>
  ));

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800 text-center">Strategy Execution Details</h1>

      <table className="w-full border-collapse bg-gray-50 shadow-md rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th className="border-b px-6 py-3 text-center">Trades</th>
          </tr>
        </thead>
        <tbody>
          {dataRows.length > 0 ? dataRows : (
            <tr>
              <td className="border-b px-6 py-4 text-center text-gray-500" colSpan="1">No data available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Data;
