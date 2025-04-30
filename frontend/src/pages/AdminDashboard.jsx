import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../context/authContext';
import { useNavigate, Routes, Route } from 'react-router-dom';

import AdminSidebar from '../components/AdminSidebar';
import Navbar from '../components/Navbar';

import DepartmentList from '../components/department/DepartmentList';
import AddDepartment from '../components/department/AddDepartment';
import EditDepartment from '../components/department/EditDepartment';
import EmployeeList from '../components/employee/EmployeeList';
import AddEmployee from '../components/employee/AddEmployee';

import AdminSalaryHistory from '../components/salary/AdminSalaryHistory';
import ManageLeaves from '../components/leave/ManageLeaves';
import Settings from '../components/setting/setting';

import {
  FaUsers,
  FaBuilding,
  FaMoneyBill,
  FaFileAlt,
  FaCheckCircle,
  FaHourglassHalf,
  FaTimesCircle,
} from 'react-icons/fa';

const AdminDashboard = ({ socket }) => {
  const { user, logout } = useAuthContext();
  const navigate = useNavigate();

  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);
  const [isSocketConnected, setIsSocketConnected] = useState(true);
  const [employeeCount, setEmployeeCount] = useState(0);
  const [departmentCount, setDepartmentCount] = useState(0);
  const [monthlyPay, setMonthlyPay] = useState(0);

  const [leaveStats, setLeaveStats] = useState({
    applied: 0,
    approved: 0,
    pending: 0,
    rejected: 0,
  });

  // Fetch employee count
  useEffect(() => {
    const employees = JSON.parse(localStorage.getItem('employees')) || [];
    setEmployeeCount(employees.length);
  }, []);

  // Fetch department count
  useEffect(() => {
    const departments = JSON.parse(localStorage.getItem('departments')) || [];
    setDepartmentCount(departments.length);
  }, []);

  // Fetch total salary
  useEffect(() => {
    const salaryData = JSON.parse(localStorage.getItem('salaryData')) || [];
    const total = salaryData.reduce((sum, item) => sum + (parseFloat(item.total) || 0), 0);
    setMonthlyPay(total);
  }, []);

  // Fetch leave stats
  useEffect(() => {
    const leaves = JSON.parse(localStorage.getItem('leaves')) || [];

    const stats = {
      applied: leaves.length,
      approved: leaves.filter(l => l.status?.toLowerCase() === 'approved').length,
      pending: leaves.filter(l => l.status?.toLowerCase() === 'pending').length,
      rejected: leaves.filter(l => l.status?.toLowerCase() === 'rejected').length,
    };

    setLeaveStats(stats);
  }, []);

  const stats = {
    totalEmployees: employeeCount,
    totalDepartments: departmentCount,
    monthlyPay: monthlyPay,
    leaveApplied: leaveStats.applied,
    leaveApproved: leaveStats.approved,
    leavePending: leaveStats.pending,
    leaveRejected: leaveStats.rejected,
  };

  // Handle socket
  useEffect(() => {
    if (socket) {
      socket.on('message', (msg) => {
        setMessages((prev) => [...prev, msg]);
      });

      socket.on('connect_error', () => {
        setError('Failed to connect to the server.');
        setIsSocketConnected(false);
      });

      socket.on('connect', () => {
        setError(null);
        setIsSocketConnected(true);
      });

      return () => {
        socket.off('message');
        socket.off('connect_error');
        socket.off('connect');
      };
    }
  }, [socket]);

  return (
    <div className="flex h-screen">
      <AdminSidebar />

      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 p-6 bg-gray-100 overflow-y-auto">
          <Routes>
            <Route
              path="/"
              element={
                <div className="max-w-6xl mx-auto">
                  <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
                    <button
                      onClick={() => logout(navigate)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                    >
                      Logout
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <StatCard icon={<FaUsers />} title="Total Employees" value={stats.totalEmployees} color="teal" />
                    <StatCard icon={<FaBuilding />} title="Total Departments" value={stats.totalDepartments} color="yellow" />
                    <StatCard icon={<FaMoneyBill />} title="Monthly Pay" value={`$${stats.monthlyPay}`} color="red" />
                  </div>

                  <h2 className="text-xl font-semibold text-gray-700 mb-4">Leave Details</h2>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <StatCard icon={<FaFileAlt />} title="Leave Applied" value={stats.leaveApplied} color="teal" />
                    <StatCard icon={<FaCheckCircle />} title="Leave Approved" value={stats.leaveApproved} color="green" />
                    <StatCard icon={<FaHourglassHalf />} title="Leave Pending" value={stats.leavePending} color="yellow" />
                    <StatCard icon={<FaTimesCircle />} title="Leave Rejected" value={stats.leaveRejected} color="red" />
                  </div>

                  {messages.length > 0 && (
                    <div className="mt-8">
                      <h2 className="text-xl font-semibold text-gray-700">Real-Time Updates:</h2>
                      <ul className="mt-2 space-y-2 text-gray-600">
                        {messages.map((msg, index) => (
                          <li key={index} className="border-b py-2">{msg}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {error && <div className="mt-4 text-red-500 font-semibold">{error}</div>}
                  {!isSocketConnected && !error && (
                    <div className="mt-4 text-yellow-500 font-semibold">
                      Trying to reconnect to the server...
                    </div>
                  )}
                </div>
              }
            />

            {/* Department Routes */}
            <Route path="departments" element={<DepartmentList setDepartmentCount={setDepartmentCount} />} />
            <Route path="add-new-department" element={<AddDepartment />} />
            <Route path="edit-department/:id" element={<EditDepartment />} />

            {/* Employee Routes */}
            <Route path="employees" element={<EmployeeList setEmployeeCount={setEmployeeCount} />} />
            <Route path="employees/add-new-employee" element={<AddEmployee setEmployeeCount={setEmployeeCount} />} />
            <Route path="employees/edit/:id" element={<AddEmployee setEmployeeCount={setEmployeeCount} />} />
            <Route path="employees/view/:id" element={<div>Employee View Page (To be implemented)</div>} />
            <Route path="employees/salary/:id" element={<div>Employee Salary Page (To be implemented)</div>} />
            <Route path="employees/leave/:id" element={<div>Employee Leave Page (To be implemented)</div>} />

            {/* Salary History */}
            <Route path="salary" element={<AdminSalaryHistory />} />

            {/* Leave Page */}
            <Route path="leaves" element={<ManageLeaves />} />

            {/* ✅ Settings Page */}
            <Route path="settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

const StatCard = ({ icon, title, value, color }) => (
  <div className="bg-white rounded shadow p-4 flex items-center space-x-4">
    <div className={`text-${color}-500 text-3xl`}>{icon}</div>
    <div>
      <p className="text-gray-600">{title}</p>
      <p className="text-xl font-bold text-gray-800">{value}</p>
    </div>
  </div>
);

export default AdminDashboard;
