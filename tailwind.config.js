/** @type {import('tailwindcss').Config} */

const withMT = require("@material-tailwind/react/utils/withMT");
 
module.exports = withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        bungee: ['Bungee Spice', 'sans-serif'],
        lemon: ['Lemon', 'serif'],
        poppins: ['Poppins', 'sans-serif']
      },
    },
  },
  plugins: [],
});

