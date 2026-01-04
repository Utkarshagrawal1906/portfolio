import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/portfolio/', // make assets load correctly when hosted under GitHub Pages
  plugins: [react()],
  base: '/portfolio/', // THIS IS KEY: It must match your repo name
})
