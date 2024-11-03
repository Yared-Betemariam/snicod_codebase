/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/renderer/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        blink: 'blink 1s step-end infinite'
      },
      keyframes: {
        blink: {
          '50%': { opacity: '0' }
        }
      },
      colors: {
        primary: '#0891b2'
      }
    }
  },
  plugins: [require('@tailwindcss/typography')]
}
