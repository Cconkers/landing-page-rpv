/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts,scss}"
  ],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'fade-left': 'fadeLeft 0.6s ease-out forwards',
        'zoom-in': 'zoomIn 0.5s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        fadeLeft: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' }
        },
        zoomIn: {
          '0%': { opacity: '0', transform: 'scale(0.8)' },
          '100%': { opacity: '1', transform: 'scale(1)' }
        },
      },
      colors: {
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        danger: 'var(--danger)',
        warning: 'var(--warning)',
        success: 'var(--success)',
        background: 'var(--background-color)',
        text: 'var(--text-color)'
      }
    }
  },
  safelist: [
    'bg-red-500',
    'bg-red-600',
    'bg-yellow-500',
    'bg-yellow-600',
    'bg-blue-500',
    'bg-blue-600',
    'bg-green-500',
    'bg-green-600',
    'text-red-500',
    'text-red-600',
    'text-yellow-500',
    'text-yellow-600',
    'text-blue-500',
    'text-blue-600',
    'text-green-500',
    'text-green-600',
  ],
  plugins: []
}
