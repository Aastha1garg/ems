import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../context/authContext';
import { useNavigate } from 'react-router-dom'; // ✅ Import useNavigate

const EmployeeDashboard = ({ socket }) => {
  const { user, logout } = useAuthContext(); // ✅ Get logout function
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // ✅ Setup navigation

  useEffect(() => {
    if (socket) {
      socket.on('message', (msg) => {
        setMessages((prevMessages) => [...prevMessages, msg]);
      });

      socket.on('connect_error', () => {
        setError('Failed to connect to the server. Please try again later.');
      });

      socket.on('connect', () => {
        setError(null);
      });

      return () => {
        socket.off('message');
        socket.off('connect_error');
        socket.off('connect');
      };
    }
  }, [socket]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-teal-50 p-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-3xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-teal-700">
            Welcome {user.name}
          </h1>
          {/* ✅ Logout Button */}
          <button
            onClick={() => logout(navigate)}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
          >
            Logout
          </button>
        </div>

        <p className="text-md text-teal-500 mb-6 text-center">
          Logged in as: {user.email}
        </p>

        {error && (
          <div className="mt-4 text-red-500 font-semibold">
            {error}
          </div>
        )}

        <div className="mt-4">
          <h2 className="text-xl font-semibold text-teal-800">Real-Time Updates:</h2>
          <ul className="mt-2 space-y-2 text-teal-600">
            {messages.length === 0 ? (
              <li>No updates yet...</li>
            ) : (
              messages.map((msg, index) => (
                <li key={index} className="border-b py-2">
                  {msg}
                </li>
              ))
            )}
          </ul>
        </div>

        <div className="grid gap-6 md:grid-cols-2 mt-6">
          <div className="bg-teal-100 rounded-lg p-6 text-center">
            <h2 className="text-xl font-semibold text-teal-800 mb-2">Profile Information</h2>
            <p className="text-teal-700">View and update your personal details.</p>
          </div>
          <div className="bg-teal-100 rounded-lg p-6 text-center">
            <h2 className="text-xl font-semibold text-teal-800 mb-2">Attendance</h2>
            <p className="text-teal-700">Track your daily attendance records.</p>
          </div>
          <div className="bg-teal-100 rounded-lg p-6 text-center">
            <h2 className="text-xl font-semibold text-teal-800 mb-2">Salary Details</h2>
            <p className="text-teal-700">Check your salary slips and payment history.</p>
          </div>
          <div className="bg-teal-100 rounded-lg p-6 text-center">
            <h2 className="text-xl font-semibold text-teal-800 mb-2">Leaves</h2>
            <p className="text-teal-700">Apply for leave and check status.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
