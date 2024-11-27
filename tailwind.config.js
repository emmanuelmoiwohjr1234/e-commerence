/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FF6B6B',
          light: '#FF8787',
          dark: '#FA5252',
        },
        secondary: {
          DEFAULT: '#4ECDC4',
          light: '#72EFE9',
          dark: '#45B7AF',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
          '2xl': '6rem',
        },
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
      },
    },
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        '.btn': {
          padding: '0.5rem 1rem',
          borderRadius: '0.5rem',
          fontWeight: '500',
          transition: 'all 0.2s',
        },
        '.btn-primary': {
          backgroundColor: '#FF6B6B',
          color: 'white',
          '&:hover': {
            backgroundColor: '#FA5252',
          },
        },
        '.btn-secondary': {
          backgroundColor: '#4ECDC4',
          color: 'white',
          '&:hover': {
            backgroundColor: '#45B7AF',
          },
        },
        '.input': {
          padding: '0.5rem 1rem',
          borderRadius: '0.5rem',
          border: '1px solid #e2e8f0',
          '&:focus': {
            outline: 'none',
            borderColor: '#FF6B6B',
            boxShadow: '0 0 0 2px rgba(255, 107, 107, 0.2)',
          },
        },
      })
    },
  ],
}
