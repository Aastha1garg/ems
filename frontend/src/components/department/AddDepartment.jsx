import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddDepartment = () => {
  const [departmentName, setDepartmentName] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newDepartment = {
      id: Date.now(),
      name: departmentName,
      description,
    };

    const existingDepartments = JSON.parse(localStorage.getItem('departments')) || [];
    const updatedDepartments = [...existingDepartments, newDepartment];
    localStorage.setItem('departments', JSON.stringify(updatedDepartments));

    setDepartmentName('');
    setDescription('');

    alert('Department added successfully!');
    navigate('/admin-dashboard/departments');
  };

  return (
    <div className="flex justify-center items-center h-full mt-10">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-xl font-semibold mb-6">Add New Department</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1">Department Name</label>
            <input
              type="text"
              value={departmentName}
              onChange={(e) => setDepartmentName(e.target.value)}
              placeholder="Department Name"
              className="w-full border rounded p-2"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              className="w-full border rounded p-2"
              rows={4}
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-teal-600 text-white py-2 rounded"
          >
            Add Department
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddDepartment;
