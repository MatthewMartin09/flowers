import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // This base path is critical for GitHub Pages project sites.
  // It ensures your CSS and JS files are found at 
  // https://matthewmartin09.github.io/flowers/
  base: '/flowers/', 
})