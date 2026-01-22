/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'nature': {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        'healing': {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        'peach': {
          50: '#fef7f0',
          100: '#fdecd8',
          200: '#fbd5b0',
          300: '#f8b87d',
          400: '#f5934a',
          500: '#f27022',
          600: '#e35a1a',
          700: '#bc4518',
          800: '#963a1b',
          900: '#7a3219',
        },
        'lavender': {
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#a855f7',
          600: '#9333ea',
          700: '#7c3aed',
          800: '#6b21a8',
          900: '#581c87',
        }
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'nature-bg': "url('data:image/svg+xml,%3Csvg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 1200 800\"%3E%3Cdefs%3E%3ClinearGradient id=\"a\" x1=\"0%25\" y1=\"0%25\" x2=\"100%25\" y2=\"100%25\"%3E%3Cstop offset=\"0%25\" style=\"stop-color:%23fef7f0;stop-opacity:1\" /%3E%3Cstop offset=\"50%25\" style=\"stop-color:%23e0f2fe;stop-opacity:1\" /%3E%3Cstop offset=\"100%25\" style=\"stop-color:%23faf5ff;stop-opacity:1\" /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width=\"1200\" height=\"800\" fill=\"url(%23a)\"/%3E%3C/svg%3E')",
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      }
    },
  },
  plugins: [],
}
