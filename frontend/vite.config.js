import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  
  plugins: [react() , tailwindcss()],
  content: ["./src/**/*.{html,js,jsx}"],
  assetsInclude:['**/*.jpg', '**/*.jpeg', '**/*.png', '**/*.gif', '**/*.svg', '**/*.webp', 'https://lh3.googleusercontent.com/*']
  
})
