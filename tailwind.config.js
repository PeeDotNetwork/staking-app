/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          background: '#0a0a0a',
          accent: '#6366f1',
          text: '#ffffff',
          secondary: '#1e1e1e',
          hover: '#8b5cf6',
        },
        elegant: {
          dark: '#0a0a0a',
          darker: '#050505',
          light: '#1a1a1a',
          lighter: '#2a2a2a',
          accent: '#6366f1',
          purple: '#8b5cf6',
          pink: '#d946ef',
          white: '#ffffff',
          gray: '#6b7280',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      backdropBlur: {
        'xs': '2px',
      },
      animation: {
        'gradient-shift': 'gradient-shift 4s ease infinite',
        'float-elegant': 'float 6s ease-in-out infinite',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-elegant': 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #d946ef 100%)',
        'gradient-dark': 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
      }
    },
  },
  plugins: [],
}