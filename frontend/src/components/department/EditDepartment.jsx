import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditDepartment = () => {
  const { id } = useParams(); // Get the department ID from the URL
  const navigate = useNavigate();

  const [departmentName, setDepartmentName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    // Get the department from localStorage based on the ID
    const storedDepartments = localStorage.getItem('departments');
    const departments = storedDepartments ? JSON.parse(storedDepartments) : [];
    const departmentToEdit = departments.find((dept) => dept.id === parseInt(id));
    
    if (departmentToEdit) {
      setDepartmentName(departmentToEdit.name);
      setDescription(departmentToEdit.description);
    }
  }, [id]); // Re-run the effect if the ID changes

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedDepartment = { id: parseInt(id), name: departmentName, description };

    // Get the departments, update the department, and save back to localStorage
    const storedDepartments = localStorage.getItem('departments');
    const departments = storedDepartments ? JSON.parse(storedDepartments) : [];
    const updatedDepartments = departments.map((dept) =>
      dept.id === parseInt(id) ? updatedDepartment : dept
    );

    // Save the updated department list in localStorage
    localStorage.setItem('departments', JSON.stringify(updatedDepartments));

    // Navigate back to the department list
    navigate('/admin-dashboard/departments');
  };

  return (
    <div className="flex justify-center items-center h-full mt-10">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-xl font-semibold mb-6">Edit Department</h2>
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
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditDepartment;
