/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
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
          950: '#082f49',
        },
        accent: {
          cyan: '#22d3ee',
          fuchsia: '#e879f9',
        },
      },
      boxShadow: {
        'cyan-glow': '0 4px 14px 0 rgba(34, 211, 238, 0.5)',
        'fuchsia-glow': '0 4px 14px 0 rgba(232, 121, 249, 0.5)',
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      animation: {
        'spin-slow': 'spin 4s linear infinite',
        'pulse-fast': 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fade-in 1s ease-out both',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
