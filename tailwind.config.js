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
        // FIX: Replaced yellow hex codes with actual teal colors for consistency.
        'teal-500': '#14b8a6',
        'teal-600': '#0d9488',
      },
    },
  },
  plugins: [],
}