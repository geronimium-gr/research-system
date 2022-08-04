/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  important: true,
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    extend: {
      fontSize: {
        h1: ["1.875rem", "2.25rem"],
        h2: ["1.5rem", "2rem"],
        h3: ["1.25rem", "1.75rem"],
        h4: ["1.125rem", "1.75rem"],
        h5: ["1rem", "1.5rem"],
        h6: ["0.875rem", "1.25rem"],
      },
    },
  },
  plugins: [],
};
