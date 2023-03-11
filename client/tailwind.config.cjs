/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        '3xl':
          '0 0 2px 4px rgb(0 132 250 / 10%), 0 2px 4px rgb(0 132 250 / 10%), 0 12px 24px rgb(0 132 250 / 10%)',
      },
    },
  },
  plugins: [],
}
