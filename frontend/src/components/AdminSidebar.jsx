import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaTachometerAlt,
  FaUsers,
  FaBuilding,
  FaCalendarAlt,
  FaMoneyCheckAlt,
  FaCog,
  FaPlus
} from 'react-icons/fa';

const AdminSidebar = () => {
  return (
    <div className="w-64 bg-[#121c2c] text-white h-full p-4">
      <h2 className="text-2xl font-bold mb-6 text-center text-white">Employee MS</h2>
      <ul className="space-y-4">
        <li>
          <Link to="/admin-dashboard" className="flex items-center space-x-2 hover:text-teal-400">
            <FaTachometerAlt /> <span>Dashboard</span>
          </Link>
        </li>
        <li>
          <Link to="/admin-dashboard/employees" className="flex items-center space-x-2 hover:text-teal-400">
            <FaUsers /> <span>Employees</span>
          </Link>
        </li>
        <li>
          {/* ✅ New link to add new employee */}
          <Link to="/admin-dashboard/employees/add-new-employee" className="flex items-center space-x-2 hover:text-teal-400">
            <FaPlus /> <span>Add Employee</span>
          </Link>
        </li>
        <li>
          <Link to="/admin-dashboard/departments" className="flex items-center space-x-2 hover:text-teal-400">
            <FaBuilding /> <span>Departments</span>
          </Link>
        </li>
        <li>
          <Link to="/admin-dashboard/add-new-department" className="flex items-center space-x-2 hover:text-teal-400">
            <FaPlus /> <span>Add Department</span>
          </Link>
        </li>
        <li>
          <Link to="/admin-dashboard/leaves" className="flex items-center space-x-2 hover:text-teal-400">
            <FaCalendarAlt /> <span>Leaves</span>
          </Link>
        </li>
        <li>
          <Link to="/admin-dashboard/salary" className="flex items-center space-x-2 hover:text-teal-400">
            <FaMoneyCheckAlt /> <span>Salary</span>
          </Link>
        </li>
        <li>
          <Link to="/admin-dashboard/settings" className="flex items-center space-x-2 hover:text-teal-400">
            <FaCog /> <span>Settings</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default AdminSidebar;
