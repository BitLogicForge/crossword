import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/crossword/',
  // esbuild options can be added here if needed, but 'drop' is not valid in Vite config
  server: {
    host: "0.0.0.0",
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (
              ['react', 'react-dom', 'react-redux', '@mui/material'].some(pkg => id.includes(pkg))
            ) {
              return 'vendor';
            }
          }
        },
      },
    },
  },
});
