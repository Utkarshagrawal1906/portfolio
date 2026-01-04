import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/portfolio/', // make assets load correctly when hosted under GitHub Pages
  plugins: [react()],
})
