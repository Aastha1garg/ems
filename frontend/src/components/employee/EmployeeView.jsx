import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const EmployeeView = () => {
  const { id } = useParams(); // Get employee ID from URL
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    const employees = JSON.parse(localStorage.getItem('employees')) || [];
    const employeeToView = employees.find(emp => emp.id === parseInt(id));
    if (employeeToView) {
      setEmployee(employeeToView);
    }
  }, [id]);

  if (!employee) return <div>Employee not found</div>;

  return (
    <div className="p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-semibold mb-4">Employee Details</h2>
      <div className="space-y-4">
        <div>
          <strong>Name:</strong> {employee.name}
        </div>
        <div>
          <strong>DOB:</strong> {employee.dob}
        </div>
        <div>
          <strong>Department:</strong> {employee.department}
        </div>
        <div>
          <strong>Email:</strong> {employee.email}
        </div>
        <div>
          <strong>Phone:</strong> {employee.phone}
        </div>
        <div>
          <strong>Address:</strong> {employee.address}
        </div>
      </div>
    </div>
  );
};

export default EmployeeView;
