import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3000',
        changeOrigin: true,
        configure: (proxy) => {
          proxy.on('error', (err, req, res) => {})
        }
      },
      '/ws': {
        target: 'ws://127.0.0.1:3000',
        ws: true,
        changeOrigin: true,
        configure: (proxy) => {
          proxy.on('error', (err, req, res) => {})
          proxy.on('proxyReqWs', (proxyReq, req, socket, options, head) => {
            socket.on('error', () => {})
          })
          proxy.on('open', (proxySocket) => {
            proxySocket.on('error', () => {})
          })
        }
      }
    }
  }
})
