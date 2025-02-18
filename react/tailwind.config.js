/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        'primary-hover': 'var(--primary-hover)',
        'button-bg': 'var(--button-bg)',
        'button-bg-light': 'var(--button-bg-light)',
      },
    },
  },
  plugins: [],
}
