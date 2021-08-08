const colors = require("tailwindcss/colors");

module.exports = {
  // purge: [],
  purge: ["./src/pages/**/*.{ts,tsx}", "./src/components/**/*.{ts,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        "palette-mosaic": ["Palette Mosaic", "cursive"],
      },
      colors: {
        ...colors,
        teal: colors.teal,
        blueGray: colors.blueGray,
      },
    },
  },
  variants: {
    extend: {
      outline: ["focus-visible"],
      ringColor: ["focus-visible"],
      ringOffsetColor: ["focus-visible"],
      ringOffsetWidth: ["focus-visible"],
      ringOpacity: ["focus-visible"],
      ringWidth: ["focus-visible"],
    },
  },
  plugins: [],
};
