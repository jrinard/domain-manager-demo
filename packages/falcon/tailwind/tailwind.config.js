// Minimal Tailwind config for linting purposes only
// This package doesn't use Tailwind classes directly - it provides the config factory for other packages
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
}
