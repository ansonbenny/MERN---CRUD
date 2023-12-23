import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://server:5000/api/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
      '/files': {
        target: 'http://server:5000/files/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/files/, ''),
      }
    },
    host: true,
    strictPort: true,
    port: 5173,
    watch: {
      usePolling: true
    }
  }
})
