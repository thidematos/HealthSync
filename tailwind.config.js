/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./views/**/*.{html,js,pug}'],
  theme: {
    extend: {
      fontFamily: {
        poppins: 'Poppins',
        barlow: 'Barlow Condensed',
        inter: 'Inter',
      },
      colors: {
        sixty: '#3498db',
        thirty: '#ecf0f1',
        ten: '#e74c3c',
        azul: '#3856F0',
        branco: '#F4F6FF',
        amarelo: '#EDBB1F',
      },
      backgroundImage: {
        gradientBlue:
          'linear-gradient(269.29deg, #798FFF 10.73%, #1E40EC 82.46%)',
      },
    },
  },
  plugins: [],
};
