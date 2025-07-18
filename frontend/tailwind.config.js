/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}", // Scan all components and pages
      "./public/index.html"
    ],
    theme: {
      extend: {
        colors: {
          primary: "#2563eb", // Custom blue
          secondary: "#1d4ed8",
          accent: "#10b981"
        },
        fontFamily: {
          sans: ["Inter", "Segoe UI", "sans-serif"]
        }
      }
    },
    plugins: []
  };
  