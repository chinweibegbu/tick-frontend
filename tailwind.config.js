/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        green: {
          light: '#A2C3BD',
          DEFAULT: '#61988E',
          dark: '#3A5A54'
        },
        red: {
          light: '#B79298',
          DEFAULT: '#702632',
          dark: '#391319'
        },
        'neutral-100': '#FFFFFF',
        'neutral-70': '#7F7F7F',
        'neutral-30': '#C3C3C3',
        'neutral-0': '#000000',
      },
      fontFamily: {
        exo: ["Exo", "sans-serif"],
        tabular: ["Tabular", "sans-serif"],
      },
      fontSize: {
        regular: "18px",
        small: "12px",
        title: "84px",
        subtitle: "24px",
        button: "18px",
        heading: "36px",
        inputLabel: "14px",
        inputText: "18px",
        inputTag: "12px",

        "icon-large": "36px",
        "icon-regular": "24px",
        "icon-small": "18px",

      }
    },
  },
  plugins: [],
}

