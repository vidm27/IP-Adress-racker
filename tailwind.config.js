import { url } from 'inspector';


/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        'sans': ['Rubik', ]
      },
      backgroundImage: {
        'hero-desktop': url('src/assets/img/pattern-bg-desktop.png'),
        'hero-mobile': url('src/assets/img/pattern-bg-mobile.png')
      }
    },
  },
  plugins: [],
}