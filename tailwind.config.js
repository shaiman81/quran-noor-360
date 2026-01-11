
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      colors: {
        primary: '#0F172A',
        secondary: '#1F2937',
        muted: '#4B5563',
        inactive: '#374151',
        accent: '#0D9488',
        emerald: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
          950: '#022c22',
        },
        teal: {
          500: '#14b8a6',
          800: '#115e59',
          900: '#134e4a',
          950: '#042f2e',
        },
        gold: {
          100: '#fef3c7',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
        },
        cream: {
          50: '#fffbeb',
          100: '#fef3c7',
        }
      },
      boxShadow: {
        'premium': '0 10px 30px -10px rgba(0, 0, 0, 0.3)',
        'glow': '0 0 20px rgba(245, 158, 11, 0.15)',
        'glass': '0 4px 30px rgba(0, 0, 0, 0.1)',
      },
      backgroundImage: {
        'gradient-rich': 'linear-gradient(to bottom right, #064e3b, #115e59, #0f172a)',
        'gradient-gold': 'linear-gradient(to right, #f59e0b, #d97706)',
      }
    },
  },
  plugins: [],
}
