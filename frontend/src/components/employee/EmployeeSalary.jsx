import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EmployeeSalary = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({
    department: '',
    employeeId: '',
    basic: '',
    allowances: '',
    deductions: '',
    payDate: '',
  });

  useEffect(() => {
    const storedEmployees = JSON.parse(localStorage.getItem('employees')) || [];
    const allDepartments = [...new Set(storedEmployees.map(emp => emp.department))];

    setEmployees(storedEmployees);
    setDepartments(allDepartments);

    const found = storedEmployees.find(emp => String(emp.id) === String(id));
    if (found) {
      setEmployee(found);
      setFormData(prev => ({
        ...prev,
        department: found.department || '',
        employeeId: found.id || '',
        basic: found.salary?.basic || '',
        allowances: found.salary?.allowances || '',
        deductions: found.salary?.deductions || '',
        payDate: '',
      }));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const calculateTotal = () => {
    const { basic, allowances, deductions } = formData;
    const total =
      (parseFloat(basic) || 0) +
      (parseFloat(allowances) || 0) -
      (parseFloat(deductions) || 0);
    return total.toFixed(2);
  };

  const handleAddSalary = () => {
    const selectedEmployee = employees.find(emp => String(emp.id) === String(formData.employeeId));
    if (!selectedEmployee) {
      alert("Please select a valid employee.");
      return;
    }

    const updatedEmployee = {
      ...selectedEmployee,
      salary: {
        basic: formData.basic,
        allowances: formData.allowances,
        deductions: formData.deductions,
        total: calculateTotal(),
      },
    };

    // Update localStorage
    const updatedList = employees.map(emp =>
      String(emp.id) === String(formData.employeeId) ? updatedEmployee : emp
    );
    localStorage.setItem('employees', JSON.stringify(updatedList));

    // Add to salary history
    const salaryHistory = JSON.parse(localStorage.getItem('salaryHistory')) || [];
    const newEntry = {
      empId: updatedEmployee.id,
      name: updatedEmployee.name,
      ...formData,
      total: calculateTotal(),
    };
    salaryHistory.push(newEntry);
    localStorage.setItem('salaryHistory', JSON.stringify(salaryHistory));

    alert('Salary added successfully!');
    navigate('/admin-dashboard/salary-history');
  };

  return (
    <div className="p-6 bg-white shadow rounded max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Add New Salary</h2>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 font-medium">Department</label>
          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">Select Department</option>
            {departments.map((dept, idx) => (
              <option key={idx} value={dept}>{dept}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Employee</label>
          <select
            name="employeeId"
            value={formData.employeeId}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">Select Employee</option>
            {employees
              .filter(emp => emp.department === formData.department)
              .map(emp => (
                <option key={emp.id} value={emp.id}>{emp.name}</option>
              ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Basic Salary</label>
          <input
            type="number"
            name="basic"
            value={formData.basic}
            onChange={handleChange}
            placeholder="Insert Salary"
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Allowances</label>
          <input
            type="number"
            name="allowances"
            value={formData.allowances}
            onChange={handleChange}
            placeholder="Monthly Allowances"
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Deductions</label>
          <input
            type="number"
            name="deductions"
            value={formData.deductions}
            onChange={handleChange}
            placeholder="Monthly Deductions"
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Pay Date</label>
          <input
            type="date"
            name="payDate"
            value={formData.payDate}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
      </div>

      <div className="mt-4">
        <strong>Total Salary:</strong> ${calculateTotal()}
      </div>

      <button
        onClick={handleAddSalary}
        className="mt-6 w-full bg-blue-600 text-white px-5 py-3 rounded hover:bg-blue-700 transition"
      >
        Add Salary
      </button>
    </div>
  );
};

export default EmployeeSalary;
