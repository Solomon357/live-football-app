import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/live-football-app.netlify.app/'
  // server: {
  //   proxy: {
  //     "/api": {
  //       target: "https://api.football-data.org",
  //       changeOrigin: true,
  //       secure: false,
  //       rewrite: (p) => p.replace(/^\/api/, ""),
  //     },
  //   },
  //   cors: false
  // }
})
