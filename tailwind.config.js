/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'gray-900': '#121212',
        'gray-800': '#1E1E1E',
        'gray-700': '#2D2D2D',
        'gray-600': '#3C3C3C',
        'gray-400': '#9CA3AF',
        'teal-500': '#EFE91B',
        'teal-600': '#d4c90a',
      },
    },
  },
  plugins: [],
}