import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import DepartmentTable from './DepartmentTable';
import DepartmentSearchBar from './DepartmentSearchBar';

const DepartmentList = ({ setDepartmentCount }) => {
  const [departments, setDepartments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // Fetch departments from localStorage whenever location changes
  useEffect(() => {
    try {
      const storedDepartments = localStorage.getItem('departments');
      const parsed = JSON.parse(storedDepartments);
      if (Array.isArray(parsed)) {
        setDepartments(parsed);
      } else {
        console.warn('Stored departments is not a valid array. Resetting to empty.');
        setDepartments([]);
      }
    } catch (error) {
      console.error('Failed to load departments from localStorage:', error);
      setDepartments([]);
    }
  }, [location]); // Runs on every location change

  // Update department count when departments change
  useEffect(() => {
    if (setDepartmentCount && typeof setDepartmentCount === 'function') {
      setDepartmentCount(departments.length);
    } else {
      console.error('setDepartmentCount is not a function');
    }
  }, [departments, setDepartmentCount]);

  // Filter departments based on the search term
  const filteredDepartments = departments.filter(department =>
    department.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle editing a department
  const handleEdit = (id) => {
    navigate(`/admin-dashboard/edit-department/${id}`);
  };

  // Handle deleting a department
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this department?')) {
      const updatedDepartments = departments.filter((dept) => dept.id !== id);
      setDepartments(updatedDepartments);
      localStorage.setItem('departments', JSON.stringify(updatedDepartments));
    }
  };

  // Navigate to Add Department page
  const handleAddDepartment = () => {
    navigate('/admin-dashboard/add-new-department');
  };

  // Handle search term change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Manage Departments</h2>
      <div className="flex justify-between items-center mb-4">
        {/* Search bar with controlled value */}
        <DepartmentSearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />
        
        {/* Button to add new department */}
        <button
          className="bg-teal-600 text-white px-4 py-2 rounded"
          onClick={handleAddDepartment}
        >
          Add New Department
        </button>
      </div>

      {/* Department Table with filtered list */}
      <DepartmentTable
        departments={filteredDepartments}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default DepartmentList;
