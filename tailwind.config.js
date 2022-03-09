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
        primary: '#ffffff',
        secondary: '#0F172A',
        gray: colors.slate,
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
      },

      animation: {
        wiggle: 'wiggle 250ms 10 ease-in-out',
        spin: 'spin 0.5s linear 1',
      },
      backgroundImage: {
        'check-box': "url('../public/images/checkMark.png')",
        arrowDown:
          "url('https://img.icons8.com/ios/18/000000/expand-arrow--v2.png')",
      },
    },
  },
  plugins: [],
};
