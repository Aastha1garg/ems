import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../context/authContext';

const RoleBaseRoutes = ({ element, role }) => {
  const { user } = useAuthContext(); // Get the current user from context

  // Log the user and their role for debugging
  console.log("User data:", user);
  console.log("Required role:", role);

  if (!user) {
    return <Navigate to="/login" replace />; // Redirect to login if not logged in
  }

  if (role && user.role !== role) {
    return <Navigate to="/unauthorized" replace />; // Redirect to unauthorized if role doesn't match
  }

  // ✅ If the role matches, return the component directly
  return element;
};

export default RoleBaseRoutes;
