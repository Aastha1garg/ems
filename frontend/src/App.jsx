import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { io } from 'socket.io-client';

import { AuthProvider, useAuthContext } from './context/authContext';
import Login from './pages/Login.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import EmployeeDashboard from './pages/EmployeeDashboard.jsx';
import PrivateRoutes from './utils/PrivateRoutes.jsx';
import RoleBaseRoutes from './utils/RoleBaseRoutes.jsx';
import AddDepartment from './components/department/AddDepartment.jsx';
import DepartmentList from './components/department/DepartmentList.jsx';
import AddEmployee from './components/employee/AddEmployee.jsx'; // ✅ Import your AddEmployee component

function AppRoutes() {
  const { user, loading } = useAuthContext();
  const [socket, setSocket] = useState(null);
  const [departmentCount, setDepartmentCount] = useState(0); // Track department count

  useEffect(() => {
    if (user) {
      const socketConnection = io('http://localhost:5000', {
        query: { token: localStorage.getItem('token') },
        withCredentials: true,
      });
      setSocket(socketConnection);

      return () => socketConnection.disconnect();
    }
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      <Route
        path="/login"
        element={
          user ? (
            <Navigate
              to={user.role === 'admin' ? '/admin-dashboard' : '/employee-dashboard'}
              replace
            />
          ) : (
            <Login />
          )
        }
      />
      <Route
        path="/"
        element={
          user ? (
            <Navigate
              to={user.role === 'admin' ? '/admin-dashboard' : '/employee-dashboard'}
              replace
            />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      {/* 👇 Private authenticated routes */}
      <Route element={<PrivateRoutes />}>
        {/* ✅ Updated path to allow nested routes */}
        <Route
          path="/admin-dashboard/*"
          element={
            <RoleBaseRoutes
              element={<AdminDashboard departmentCount={departmentCount} socket={socket} />}
              role="admin"
            />
          }
        />

        {/* Standalone sub-routes will be handled *inside* AdminDashboard's <Routes> block */}
        <Route
          path="/employee-dashboard"
          element={<RoleBaseRoutes element={<EmployeeDashboard socket={socket} />} role="employee" />}
        />
      </Route>
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
