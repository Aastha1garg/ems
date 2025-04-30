import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';  // For routing and redirection
import { useAuthContext } from '../context/authContext';  // Import the auth context

const PrivateRoutes = () => {
  const { user } = useAuthContext();  // Get the user from the auth context

  // If the user is not logged in, redirect them to the login page
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If the user is logged in, allow them to access the protected route
  return <Outlet />;  // Render the child routes (the protected route)
};

export default PrivateRoutes;
