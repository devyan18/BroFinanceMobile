/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        lemon: "#26b901ff", // El verde característico
        dark: "#0a0a0a", // Fondo casi negro
        card: "#121212", // Fondo de inputs
      },
    },
  },
  plugins: [],
};
