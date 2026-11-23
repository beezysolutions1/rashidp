/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Cormorant Garamond"', "Garamond", '"Times New Roman"', "serif"],
        sans: ["Jost", '"Futura"', '"Century Gothic"', "system-ui", "sans-serif"],
      },
      // Strict monochrome palette — nothing else is allowed.
      colors: { ink: "#000000", paper: "#FFFFFF", line: "#E5E5E5", coal: "#1A1A1A" },
    },
  },
  plugins: [],
};
