import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const EmployeeLeave = () => {
  const { id } = useParams(); // Get employee ID from URL
  const [employee, setEmployee] = useState(null);
  const [leaveHistory, setLeaveHistory] = useState([]);
  const [leaveRequest, setLeaveRequest] = useState({
    startDate: '',
    endDate: '',
    reason: '',
  });

  useEffect(() => {
    const employees = JSON.parse(localStorage.getItem('employees')) || [];
    const employeeToView = employees.find(emp => emp.id === parseInt(id));
    if (employeeToView) {
      setEmployee(employeeToView);
      setLeaveHistory(employeeToView.leaveHistory || []);
    }
  }, [id]);

  const handleLeaveChange = (e) => {
    const { name, value } = e.target;
    setLeaveRequest((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmitLeaveRequest = (e) => {
    e.preventDefault();
    const newLeave = { ...leaveRequest, status: 'Pending' };
    const updatedLeaveHistory = [...leaveHistory, newLeave];
    setLeaveHistory(updatedLeaveHistory);
    // Save updated leave history to the employee data
    const employees = JSON.parse(localStorage.getItem('employees')) || [];
    const updatedEmployees = employees.map(emp =>
      emp.id === parseInt(id) ? { ...emp, leaveHistory: updatedLeaveHistory } : emp
    );
    localStorage.setItem('employees', JSON.stringify(updatedEmployees));
  };

  if (!employee) return <div>Employee not found</div>;

  return (
    <div className="p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-semibold mb-4">Leave History</h2>
      <div className="space-y-4">
        <div className="mb-4">
          <strong>Name:</strong> {employee.name}
        </div>
        <h3 className="text-xl font-semibold mb-2">Leave Requests</h3>
        <table className="min-w-full bg-gray-100">
          <thead>
            <tr>
              <th className="p-3">Start Date</th>
              <th className="p-3">End Date</th>
              <th className="p-3">Reason</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {leaveHistory.map((leave, index) => (
              <tr key={index} className="border-t">
                <td className="p-3">{leave.startDate}</td>
                <td className="p-3">{leave.endDate}</td>
                <td className="p-3">{leave.reason}</td>
                <td className="p-3">{leave.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 className="text-xl font-semibold mt-6 mb-2">Request Leave</h3>
      <form onSubmit={handleSubmitLeaveRequest} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Start Date</label>
          <input
            type="date"
            name="startDate"
            value={leaveRequest.startDate}
            onChange={handleLeaveChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">End Date</label>
          <input
            type="date"
            name="endDate"
            value={leaveRequest.endDate}
            onChange={handleLeaveChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Reason</label>
          <textarea
            name="reason"
            value={leaveRequest.reason}
            onChange={handleLeaveChange}
            className="w-full p-2 border rounded"
            rows="4"
            required
          ></textarea>
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Submit Leave Request
        </button>
      </form>
    </div>
  );
};

export default EmployeeLeave;
