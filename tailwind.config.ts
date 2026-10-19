import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f6f8ff',
          100: '#edf2ff',
          200: '#dfe8ff',
          300: '#c0d3ff',
          400: '#8ba8ff',
          500: '#5d88ff',
          600: '#3e6ce9',
          700: '#2f54c6',
          800: '#2648a6',
          900: '#243e86',
        },
        ink: '#0f172a',
        mist: '#f8fafc',
        gold: '#f7c873',
      },
      boxShadow: {
        soft: '0 20px 50px rgba(31, 41, 55, 0.09)',
      },
      backgroundImage: {
        mesh: 'radial-gradient(circle at top left, rgba(93,136,255,0.2), transparent 30%), radial-gradient(circle at bottom right, rgba(247,200,115,0.2), transparent 30%)',
      },
    },
  },
  plugins: [],
};

export default config;
