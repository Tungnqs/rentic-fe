const Colors = require("./src/assets/variable/Colors")

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'lightYellow': '#ffcf4d',
        'primaryYellow': "rgb(255, 186, 0)",
        'secondaryYellow': "#ce8236",
        'grayLight1': "#f2f2f2",
        'grayLight2': "#e6e6e6",
      }
    },
  },
  plugins: [],
  colors: Colors,
}

