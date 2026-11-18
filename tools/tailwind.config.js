// Konfigurasi build Tailwind lokal (menggantikan cdn.tailwindcss.com).
module.exports = {
  content: ['../index.html'],
  theme: { extend: {
    fontFamily: { sans: ['Inter', 'sans-serif'], heading: ['Plus Jakarta Sans', 'sans-serif'] },
    colors: { brand: { green: '#15803d', greenLight: '#16a34a', teal: '#0f766e', cardLight: '#ffffff' } }
  } },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography'), require('@tailwindcss/aspect-ratio')]
};
