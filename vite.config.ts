import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/crossword/',
  esbuild: {
    drop: ['console', 'debugger'],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Example: split vendor code
          vendor: ['react', 'react-dom', 'react-redux', '@mui/material'],
        },
      },
    },
  },
})
