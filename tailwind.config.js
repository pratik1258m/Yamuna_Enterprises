/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        gold: {
          50: '#FBF0D8', 100: '#F8E6B8', 200: '#F1D18A', 300: '#E9B355',
          400: '#E09B3A', 500: '#C17F24', 600: '#B8731A', 700: '#7E5212',
          800: '#5A3A0E', 900: '#3D260A',
        },
      },
    },
  },
  plugins: [],
}
