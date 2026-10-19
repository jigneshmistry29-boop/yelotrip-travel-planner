/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: ['class'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef7ff',
          100: '#d9efff',
          200: '#bfe5ff',
          300: '#8ed2ff',
          400: '#5bb7ff',
          500: '#1f9ef5',
          600: '#0d7fe8',
          700: '#0d6cc3',
          800: '#0e5898',
          900: '#114a7a',
        },
      },
      boxShadow: {
        soft: '0 20px 45px -25px rgba(15, 23, 42, 0.25)',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      backgroundImage: {
        'hero-glow':
          'radial-gradient(circle at top left, rgba(31,158,245,0.18), transparent 38%), radial-gradient(circle at bottom right, rgba(14,88,152,0.12), transparent 28%)',
      },
    },
  },
  plugins: [],
};
