module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
       backgroundImage: {
        'hero-bg': "url('./public/images/bg.jpg')",
      }
    },
  },
  plugins: [],
}