/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // 👈 tells Tailwind to use class strategy
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // adjust paths if needed
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
