/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#060a12',
          900: '#0a0e1a',
          850: '#0d1322',
          800: '#11192d',
          750: '#16223b',
          700: '#1c2b4a',
          600: '#25375d',
        },
        cyber: {
          blue: '#3b82f6',
          purple: '#8b5cf6',
          green: '#10b981',
          orange: '#f59e0b',
          red: '#ef4444',
          slate: '#94a3b8'
        }
      },
      fontFamily: {
        sans: ['Inter', 'IBM Plex Sans', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'IBM Plex Mono', 'monospace'],
      },
      boxShadow: {
        'cyber-sm': '0 0 10px -2px rgba(59, 130, 246, 0.15)',
        'cyber-md': '0 0 20px -3px rgba(59, 130, 246, 0.2)',
        'cyber-glow': '0 0 25px -4px rgba(139, 92, 246, 0.25)',
        'cyber-danger': '0 0 20px -3px rgba(239, 68, 68, 0.25)',
      }
    },
  },
  plugins: [],
}
