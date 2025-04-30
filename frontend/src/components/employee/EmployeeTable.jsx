import React from 'react';

const EmployeeTable = ({ employees, onEdit, onView, onSalary, onLeave }) => {
  return (
    <table className="min-w-full bg-white shadow rounded">
      <thead>
        <tr className="bg-gray-100 text-left text-gray-600">
          <th className="p-3">S No</th>
          <th className="p-3">Image</th>
          <th className="p-3">Name</th>
          <th className="p-3">DOB</th>
          <th className="p-3">Department</th>
          <th className="p-3">Action</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((emp, index) => (
          <tr key={emp.id} className="border-t">
            <td className="p-3">{index + 1}</td>
            <td className="p-3">
              <img src={emp.image} alt={emp.name} className="h-10 w-10 rounded-full" />
            </td>
            <td className="p-3">{emp.name}</td>
            <td className="p-3">{emp.dob}</td>
            <td className="p-3">{emp.department}</td>
            <td className="p-3 space-x-2">
              <button
                onClick={() => onView(emp.id)}
                className="bg-blue-500 text-white px-2 py-1 rounded"
              >
                View
              </button>
              <button
                onClick={() => onEdit(emp.id)}
                className="bg-green-500 text-white px-2 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => onSalary(emp.id)}
                className="bg-yellow-500 text-white px-2 py-1 rounded"
              >
                Salary
              </button>
              <button
                onClick={() => onLeave(emp.id)}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Leave
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EmployeeTable;
