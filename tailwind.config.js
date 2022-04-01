const { white } = require('tailwindcss/colors');
const colors = require('tailwindcss/colors');

module.exports = {
  mode: 'jit',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // custom colors
        lightest: '#f4f4f5',
        lighter: '#e4e4e7',
        light: '#d4d4d8',

        darkest: '#18181b',
        darker: '#27272a',
        dark: '#3f3f46',

        accent: '#EA580C',
      },

      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
        heading: ['Poppins', 'sans-serif'],
        lato: ['"Lato"'],
      },

      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        spin: {
          to: {
            transform: 'rotate(360deg)',
          },
        },
        slide: {
          '0%': {
            opacity: '0',
            transform: 'translateY(-5px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
      },

      animation: {
        wiggle: 'wiggle 250ms 10 ease-in-out',
        spin: 'spin 0.5s ease-in-out 1',
        slide: 'slide 250ms ease-in-out',
      },
      backgroundImage: {
        'check-box': "url('../public/images/check.svg')",
        arrowDown: "url('../public/images/chevron-down.svg')",
      },
    },
  },
  plugins: [],
};
