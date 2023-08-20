/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        core: {
          todo: '#8284FA',
          'todo-dark': '#5E60CE',
          'todo-darker': '#4EA8DE',
          'todo-darkest': '#1E6F9F',
          purple: '#8284FA',
          'purple-dark': '#5E60CE',
          blue: '#4EA8DE',
          'blue-dark': '#1E6F9F',
        },
        base: {
          darkest: '#0D0D0D',
          darker: '#1A1A1A',
          dark: '#262626',
          DEFAULT: '#333333',
          gray700: '#4D4D4D',
          gray600: '#666666',
          gray500: '#7F7F7F',
          gray400: '#999999',
          gray300: '#B3B3B3',
          gray200: '#CCCCCC',
          light: '#D9D9D9',
          lightest: '#F2F2F2',
          danger: '#E25858',
        },
      },
    },
  },
  plugins: [],
}