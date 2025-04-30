import { useState, useEffect } from 'react';
import useSocket from '../hooks/useSocket'; // Adjust the import path if needed

const Dashboard = () => {
  const [messages, setMessages] = useState([]);
  const socket = useSocket('http://localhost:5000', localStorage.getItem('token'));

  useEffect(() => {
    if (socket) {
      // Message event
      socket.on('message', (data) => {
        console.log('Message from server:', data);
        setMessages(prevMessages => [...prevMessages, data]); // Store messages in the state
      });
    }
  }, [socket]);  // Ensure it runs when the socket changes

  return (
    <div>
      <h1>Dashboard</h1>
      <div>
        <h2>Messages:</h2>
        {messages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>
      {/* Your other dashboard content */}
    </div>
  );
};

export default Dashboard;
