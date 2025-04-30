import React from 'react';

const DepartmentTable = ({ departments, onEdit, onDelete }) => {
  return (
    <table className="min-w-full border">
      <thead className="bg-gray-200">
        <tr>
          <th className="py-2 px-4 border">S No</th>
          <th className="py-2 px-4 border">Department</th>
          <th className="py-2 px-4 border">Action</th>
        </tr>
      </thead>
      <tbody>
        {departments.map((dept, index) => (
          <tr key={dept.id} className="text-center">
            <td className="py-2 px-4 border">{index + 1}</td>
            <td className="py-2 px-4 border">{dept.name}</td>
            <td className="py-2 px-4 border">
              <button
                className="bg-green-500 text-white px-3 py-1 mr-2 rounded"
                onClick={() => onEdit(dept.id)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded"
                onClick={() => onDelete(dept.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DepartmentTable;
