const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      xs: '0px',
      sm: '576px',
      md: '768px',
      lg: '992px',
      xl: '1200px',
      '2xl': '1400px',
    },
    fontSize: {
      xs: ['0.75rem', { lineHeight: '1rem' }],
      sm: ['0.875rem', { lineHeight: '1.5rem' }],
      base: ['1rem', { lineHeight: '1.75rem' }],
      lg: ['1.125rem', { lineHeight: '2rem' }],
      xl: ['1.25rem', { lineHeight: '2rem' }],
      '2xl': ['1.5rem', { lineHeight: '2rem' }],
      '3xl': ['2rem', { lineHeight: '2.5rem' }],
      '4xl': ['2.5rem', { lineHeight: '3.5rem' }],
      '5xl': ['3rem', { lineHeight: '3.5rem' }],
      '6xl': ['3.75rem', { lineHeight: '1' }],
      '7xl': ['4.5rem', { lineHeight: '1.1' }],
      '8xl': ['6rem', { lineHeight: '1' }],
      '9xl': ['8rem', { lineHeight: '1' }],
    },
    extend: {
      animation: {
        'custom-bounce': 'bounce 1s 5',
        'custom-spin': 'spin 1s linear 1',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      colors: {
        'neon-blue-tone-100': '#7272DA',
        'neon-blue-tone-200': '#8080CB',
        'neon-blue-tone-300': '#8E8EBD',
        'neon-blue-tone-400': '#9898B4',
        'neon-blue-50': '#F4F4FD',
        'neon-blue-100': '#E9E9FC',
        'neon-blue-200': '#C8C8F7',
        'neon-blue-300': '#A6A6F2',
        'neon-blue-400': '#8585ED',
        'neon-blue-500': '#6262e8',
        'neon-blue-600': '#2626DF',
        'neon-blue-700': '#1919A5',
        'neon-blue-800': '#0F0F67',
        'neon-blue-900': '#060629',
      },
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
        display: ['Lexend', ...defaultTheme.fontFamily.sans],
      },
      maxWidth: {
        '2xl': '40rem',
      },
    },
  },
  plugins: [],
};
