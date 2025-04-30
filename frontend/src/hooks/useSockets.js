import { useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

const useSocket = (url, token) => {
  const socketRef = useRef(null);

  useEffect(() => {
    if (!token || socketRef.current) return;

    const socket = io(url, {
      transports: ['websocket'],
      auth: { token },
      withCredentials: true,
    });

    socketRef.current = socket;

    socket.on('connect', () => {
      console.log('✅ Connected to WebSocket server');
    });

    socket.on('disconnect', () => {
      console.log('🔴 Disconnected from WebSocket server');
    });

    socket.on('connect_error', (err) => {
      console.error('⚠️ Connection Error:', err.message);
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, [url, token]);

  return socketRef.current;
};

export default useSocket;
