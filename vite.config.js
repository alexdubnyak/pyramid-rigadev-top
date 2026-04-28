import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// Relative base: корректные пути к chunk’ам и при /pyramid/index.html, и при /pyramid/
// (и меньше поломок при кэше CDN, если путь ведущий в каталог).
export default defineConfig({
  plugins: [react()],
  base: './',
})
