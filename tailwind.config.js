/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./*.{tsx,ts}",
    "./components/**/*.tsx",
    "./views/**/*.tsx"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#F69C31",
        secondary: "#AB3625",
        accent: "#E9E0D8",
      },
      fontFamily: {
        'montserrat': ["Montserrat", "sans-serif"],
        'century-gothic': ["Century Gothic", "sans-serif"],
        'nunito': ["Nunito", "sans-serif"],
      },
    },
  },
  plugins: [],
}
