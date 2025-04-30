import { createContext, useContext, useState, useEffect } from "react";

// Create AuthContext to hold user data and authentication methods
const AuthContext = createContext();

// AuthProvider Component that provides auth-related data to the app
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user')) || null);
  const [loading, setLoading] = useState(true);

  // Login function with error handling and redirection based on user role
  const login = async ({ email, password }, navigate) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setUser(data.user); // Save user data to state
        localStorage.setItem('user', JSON.stringify(data.user)); // Save user data to localStorage
        localStorage.setItem('token', data.token); // Save token to localStorage

        // Redirect based on role after successful login
        if (navigate) {
          if (data.user.role === 'admin') {
            navigate('/admin-dashboard');
          } else if (data.user.role === 'employee') {
            navigate('/employee-dashboard');
          }
        }

        return { success: true, user: data.user };
      } else {
        return { success: false, message: data.message || 'Login failed' };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: 'Server error. Please try again later.' };
    }
  };

  // Logout function that clears user and token data
  const logout = (navigate) => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    if (navigate) {
      navigate('/login'); // Redirect to login after logout
    }
  };

  // Effect to check user on initial load and set loading to false
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Set user from localStorage if exists
    }
    setLoading(false); // Set loading to false after checking user data
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children} {/* Render the children components */}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context easily in other components
export const useAuthContext = () => {
  return useContext(AuthContext);
};
