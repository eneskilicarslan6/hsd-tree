/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
     
      colors: {
        huaweiRed: '#C7000B',
      },

      animation: {
        shine: "shine 1s",
      },

      keyframes: {
        shine: {
          "100%": { left: "125%" },
        },
      },
      
    },
  },
  plugins: [],
}