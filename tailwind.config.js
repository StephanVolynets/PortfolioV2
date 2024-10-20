/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Quicksand', 'sans-serif'],
      },
      fontSize: {
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
        '6xl': '3.75rem',
        '7xl': '4.5rem',
      },
      colors: {
        background: '#222629',
        text: '#ffffff',
        primary: '#86C232',
        secondary: '#61892F',
        accent: '#6B6E70',
        highlight: '#474B4F',
      },
    },
  },
  plugins: [],
};