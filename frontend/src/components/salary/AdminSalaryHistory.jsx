import React, { useState, useEffect } from "react";

const AdminSalaryHistory = () => {
  const [salaryData, setSalaryData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const dataFromStorage = JSON.parse(localStorage.getItem("salaryHistory")) || [];
    setSalaryData(dataFromStorage);
  }, []);

  const filteredData = salaryData.filter((item) =>
    item.empId?.toString().toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gray-100 p-8">
      <h1 className="text-2xl font-bold mb-6">Salary History</h1>

      <input
        type="text"
        placeholder="Search by Employee ID"
        className="mb-4 px-4 py-2 border rounded w-64"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="overflow-x-auto w-full max-w-6xl">
        <table className="min-w-full bg-white shadow-md rounded">
          <thead>
            <tr className="bg-gray-200 text-gray-700 text-center">
              <th className="py-2 px-4 border">SNO</th>
              <th className="py-2 px-4 border">EMP ID</th>
              <th className="py-2 px-4 border">NAME</th>
              <th className="py-2 px-4 border">BASIC</th>
              <th className="py-2 px-4 border">BONUS</th>
              <th className="py-2 px-4 border">ALLOWANCES</th>
              <th className="py-2 px-4 border">DEDUCTIONS</th>
              <th className="py-2 px-4 border">TOTAL</th>
              <th className="py-2 px-4 border">PAY DATE</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((item, index) => (
                <tr key={index} className="text-center">
                  <td className="py-2 px-4 border">{index + 1}</td>
                  <td className="py-2 px-4 border">{item.empId}</td>
                  <td className="py-2 px-4 border">{item.name || "N/A"}</td>
                  <td className="py-2 px-4 border">${item.basic || 0}</td>
                  <td className="py-2 px-4 border">${item.bonus || 0}</td>
                  <td className="py-2 px-4 border">${item.allowances || 0}</td>
                  <td className="py-2 px-4 border">${item.deductions || 0}</td>
                  <td className="py-2 px-4 border">${item.total || 0}</td>
                  <td className="py-2 px-4 border">{item.payDate}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="py-4 px-4 border text-center" colSpan="9">
                  No salary records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminSalaryHistory;
