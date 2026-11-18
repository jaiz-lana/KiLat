// Konfigurasi build Tailwind lokal (menggantikan cdn.tailwindcss.com).
module.exports = {
  darkMode: 'class',
  content: ['../index.html'],
  theme: { extend: {
    fontFamily: { sans: ['Inter', 'sans-serif'], heading: ['Plus Jakarta Sans', 'sans-serif'] },
    colors: { brand: { green: '#16a34a', greenLight: '#22c55e', teal: '#0d9488', dark: '#08140c', sidebar: '#040a06', card: '#0e1f14', cardLight: '#ffffff' } }
  } },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography'), require('@tailwindcss/aspect-ratio')]
};
