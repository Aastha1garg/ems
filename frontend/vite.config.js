import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'; // Only React plugin needed

export default defineConfig({
  plugins: [
    react(), // ✅ React plugin
  ],
  server: {
    port: 5175,
    open: true,
    historyApiFallback: true, // ✅ Important for React Router
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // ✅ Add comma here
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
