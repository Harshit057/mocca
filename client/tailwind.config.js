/* filepath: d:\mocca\client\tailwind.config.js */
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        coffee: {
          50: '#faf6f0',
          100: '#f5efe5',
          200: '#e8d5b7',
          300: '#ddbf94',
          400: '#d4a373',
          500: '#c2966b',
          600: '#a9745d',
          700: '#8b5b29',
          800: '#6f4e37',
          900: '#3e2723',
        }
      }
    },
  },
  plugins: [],
}