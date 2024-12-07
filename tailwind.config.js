module.exports = {
  content: ["./src/**/*.{html,ts,scss}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary-color)",
        secondary: "var(--secondary-color)",
        background: "var(--background-color)",
        text: "var(--text-color)",
      },
    },
  },
  darkMode: ["attribute", "[data-theme='dark']"],
  plugins: [],
};
