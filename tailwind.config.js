/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts,scss}"
  ],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
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
