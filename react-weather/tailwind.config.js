/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "background-color": "#C5FFF8",
        // "btn-color": "#845EC2",
        "primary-color": "#96EFFF",
        "secondary-color": "#2CA8FF",
        "tertiary-color": "#7B66FF",
      },
    },
  },
  plugins: [],
};
