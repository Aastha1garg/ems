import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../context/authContext';
import { useNavigate } from 'react-router-dom';

const EmployeeDashboard = ({ socket }) => {
  const { user, logout } = useAuthContext();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);

  const [salaryHistory, setSalaryHistory] = useState([]);
  const [leaveRecords, setLeaveRecords] = useState([]);

  useEffect(() => {
    if (socket) {
      socket.on('message', (msg) => setMessages((prev) => [...prev, msg]));
      socket.on('connect_error', () => setError('Connection error.'));
      socket.on('connect', () => setError(null));
      return () => {
        socket.off('message');
        socket.off('connect_error');
        socket.off('connect');
      };
    }
  }, [socket]);

  useEffect(() => {
    const salary = JSON.parse(localStorage.getItem('salaryHistory')) || [];
    const leave = JSON.parse(localStorage.getItem('leaves')) || [];

    // Filter by current user
    setSalaryHistory(salary.filter((s) => s.empId === user._id));
    setLeaveRecords(leave.filter((l) => l.empId === user._id));
  }, [user]);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-teal-50 p-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-5xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-teal-700">Welcome {user.name}</h1>
          <button onClick={() => logout(navigate)} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md">
            Logout
          </button>
        </div>

        <p className="text-md text-teal-500 mb-6 text-center">Logged in as: {user.email}</p>

        {error && <div className="mt-4 text-red-500 font-semibold">{error}</div>}

        <div className="mt-6">
          <h2 className="text-xl font-semibold text-teal-800 mb-2">Real-Time Updates</h2>
          <ul className="space-y-2 text-teal-600">
            {messages.length ? messages.map((msg, i) => <li key={i}>{msg}</li>) : <li>No updates yet...</li>}
          </ul>
        </div>

        {/* Salary Section */}
        <div className="mt-10">
          <h2 className="text-xl font-bold text-teal-800 mb-4">Your Salary History</h2>
          {salaryHistory.length ? (
            <table className="min-w-full bg-white border">
              <thead className="bg-teal-100 text-teal-800">
                <tr>
                  <th className="p-2 border">Pay Date</th>
                  <th className="p-2 border">Basic</th>
                  <th className="p-2 border">Bonus</th>
                  <th className="p-2 border">Deductions</th>
                  <th className="p-2 border">Total</th>
                </tr>
              </thead>
              <tbody>
                {salaryHistory.map((entry, index) => (
                  <tr key={index} className="text-center">
                    <td className="p-2 border">{entry.payDate}</td>
                    <td className="p-2 border">${entry.basic}</td>
                    <td className="p-2 border">${entry.bonus}</td>
                    <td className="p-2 border">${entry.deductions}</td>
                    <td className="p-2 border font-bold">${entry.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-500">No salary records found.</p>
          )}
        </div>

        {/* Leave Section */}
        <div className="mt-10">
          <h2 className="text-xl font-bold text-teal-800 mb-4">Your Leave Records</h2>
          {leaveRecords.length ? (
            <table className="min-w-full bg-white border">
              <thead className="bg-teal-100 text-teal-800">
                <tr>
                  <th className="p-2 border">From</th>
                  <th className="p-2 border">To</th>
                  <th className="p-2 border">Reason</th>
                  <th className="p-2 border">Status</th>
                </tr>
              </thead>
              <tbody>
                {leaveRecords.map((leave, index) => (
                  <tr key={index} className="text-center">
                    <td className="p-2 border">{leave.startDate}</td>
                    <td className="p-2 border">{leave.endDate}</td>
                    <td className="p-2 border">{leave.reason}</td>
                    <td className="p-2 border">{leave.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-500">No leave records found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
