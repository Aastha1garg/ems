import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EmployeeSearchBar from './EmployeeSearchBar';
import EmployeeTable from './EmployeeTable';

const EmployeeList = ({ setEmployeeCount }) => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem('employees');
    if (stored) {
      const parsed = JSON.parse(stored);
      setEmployees(parsed);
      if (setEmployeeCount) setEmployeeCount(parsed.length); // Sync with dashboard
    }
  }, []);

  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  const filtered = employees.filter(emp =>
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) // Search by employee name
  );

  const handleAdd = () => navigate('/admin-dashboard/employees/add-new-employee');

  const handleDelete = (id) => {
    const updated = employees.filter(emp => emp.id !== id);
    setEmployees(updated);
    localStorage.setItem('employees', JSON.stringify(updated));
    if (setEmployeeCount) setEmployeeCount(updated.length); // Update count after delete
  };

  // Navigation handlers
  const handleEdit = (id) => navigate(`/admin-dashboard/employees/edit/${id}`);
  const handleView = (id) => navigate(`/admin-dashboard/employees/view/${id}`);
  const handleSalary = (id) => navigate(`/admin-dashboard/employees/salary/${id}`);
  const handleLeave = (id) => navigate(`/admin-dashboard/employees/leave/${id}`);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Manage Employees</h2>
      <div className="flex justify-between mb-4">
        <EmployeeSearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />
        <button onClick={handleAdd} className="bg-teal-600 text-white px-4 py-2 rounded">
          Add New Employee
        </button>
      </div>
      <EmployeeTable
        employees={filtered}
        onDelete={handleDelete}
        onEdit={handleEdit}
        onView={handleView}
        onSalary={handleSalary}
        onLeave={handleLeave}
      />
    </div>
  );
};

export default EmployeeList;
