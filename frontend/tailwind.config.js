/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      // fontFamily: {
      //   sans : ['ClashDisplay-Regular', ...defaultTheme.fontFamily.sans]
      // },
      colors: {
        tomato: '#E50914',
        marigold: '#ffbe0b',
        customBlue: '#e2e8f0',
        brightBlue: '#0891b2',
        gradientWhite: '#d1e0e2',
        "dark-purple":"#081A51",
        'light-white': 'rgba(255,255,255,0.18)'
      }
    },
  },
  plugins: [],
}