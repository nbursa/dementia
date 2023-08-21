/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(circle, #666666, #1E6F9F)',
        'gradient-linear': 'linear-gradient(to right, #666666, #1E6F9F)',
        'gradient-todo': 'linear-gradient(to right, #8284FA, #5E60CE)',
        'gradient-purple': 'linear-gradient(to right, #8284FA, #5E60CE)',
        'gradient-blue': 'linear-gradient(to right, #4EA8DE, #1E6F9F)',
      },
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
          'gray-700': '#4D4D4D',
          'gray-600': '#666666',
          'gray-500': '#7F7F7F',
          'gray-400': '#999999',
          'gray-300': '#B3B3B3',
          'gray-200': '#CCCCCC',
          light: '#D9D9D9',
          lightest: '#F2F2F2',
          danger: '#E25858',
        },
      },
    },
  },
  plugins: [],
}