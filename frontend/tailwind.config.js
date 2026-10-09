const { fontFamily } = require('tailwindcss/defaultTheme');
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  mode: 'jit',
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', ...defaultTheme.fontFamily.sans],
         primary: ['Inter', 'sans-serif'],
      },
      colors: {
        primary: {
          400: '#00E0F3',
          500: '#00c4fd',
        },
        dark: '#333333',

        // ✅ Thêm các dòng này để fix lỗi
        border: '#E5E7EB',
        background: '#F9FAFB', // màu nền mặc định sáng
        foreground: '#FFFFFF', // màu nền phần chính (ví dụ card trắng)
      },
    },
  },


  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
};
