/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'yellow-25': '#fffef7',
        'amber-25': '#fffbeb',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'shimmer': 'shimmer 2s infinite',
        'pulse-glow': 'pulse-glow 2s infinite',
        'sparkle': 'sparkle 3s linear infinite',
        'ripple': 'ripple 0.6s ease-out',
        'gradient-shift': 'gradient-shift 3s ease infinite',
        'card-hover': 'card-hover 0.4s ease-out forwards',
        'border-dance': 'border-dance 3s ease-in-out infinite',
        'text-glow': 'text-glow 2s ease-in-out infinite',
      },
      boxShadow: {
        'professional': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06), 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'glow': '0 0 20px rgba(251, 146, 60, 0.3)',
        'glow-lg': '0 0 40px rgba(251, 146, 60, 0.4)',
        'premium': '0 10px 25px rgba(0, 0, 0, 0.15), 0 20px 40px rgba(251, 146, 60, 0.1), 0 1px 0 rgba(255, 255, 255, 0.1) inset, 0 -1px 0 rgba(0, 0, 0, 0.1) inset',
        'glow-premium': '0 0 20px rgba(251, 146, 60, 0.3), 0 0 40px rgba(251, 146, 60, 0.1), 0 10px 25px rgba(0, 0, 0, 0.15)',
      },
      backdropBlur: {
        'xs': '2px',
      }
    },
  },
  plugins: [],
};
