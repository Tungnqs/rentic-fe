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
        'thirdYellow': "#9e6327",
        'grayLight1': "#f2f2f2",
        'grayLight2': "#e6e6e6",
        'gray1': '#cccccc',
        'darkGray': '#403f3f',
        'bgDarkPrimary': '#2d3539',
        'bgLeftNavbar': '#22272a',
        'bgDarkSecondary': '#4f5d64',
        'bgDarkPopupFooter': '#2b2d31',
        'bgDarkPopupBody': '#313338',
        'darkInput': '#1e1f22',
      }
    },
  },
  plugins: [],
  colors: Colors,
}

