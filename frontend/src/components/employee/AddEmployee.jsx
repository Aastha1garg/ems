import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddEmployee = ({ setEmployeeCount }) => {   // ✅ accept setEmployeeCount as a prop
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({
    name: '',
    dob: '',
    department: '',
    image: '',
  });

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const storedEmployees = JSON.parse(localStorage.getItem('employees')) || [];
    const newEmployee = {
      id: Date.now(), // unique id
      ...employee,
    };

    const updatedEmployees = [...storedEmployees, newEmployee];
    localStorage.setItem('employees', JSON.stringify(updatedEmployees));

    // ✅ Update employee count after adding new employee
    if (setEmployeeCount) {
      setEmployeeCount(updatedEmployees.length);
    }

    navigate('/admin-dashboard/employees'); // go back to employee list
  };

  return (
    <div className="max-w-xl mx-auto bg-white shadow p-6 rounded">
      <h2 className="text-2xl font-semibold mb-4">Add New Employee</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={employee.name}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block mb-1">Date of Birth</label>
          <input
            type="date"
            name="dob"
            value={employee.dob}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block mb-1">Department</label>
          <input
            type="text"
            name="department"
            value={employee.department}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block mb-1">Image URL</label>
          <input
            type="text"
            name="image"
            value={employee.image}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <button
          type="submit"
          className="bg-teal-600 text-white px-4 py-2 rounded"
        >
          Save Employee
        </button>
      </form>
    </div>
  );
};

export default AddEmployee;
