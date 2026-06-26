/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'spring-yellow': '#FFF9E6',
        'soft-pink': '#FFE4E1',
        'fresh-green': '#E8F5E9',
        'sky-blue': '#E3F2FD',
        'cream-white': '#FFF8F0',
      },
      fontFamily: {
        serif: ['"Noto Serif SC"', 'Georgia', 'serif'],
        sans: ['"Noto Sans SC"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
