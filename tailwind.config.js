/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./<custom directory>/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        white: "#FDFCFB",
        gray: {
          900: '#202123',
          800: '#2A2D2B',
          700: '#323336',
          600: '#444547',
          400: '#9AA0A6',
        } ,
        orange: {
          800: '#5E4D4E',
          500: '#F28B81',
          300: '#F6AEA9'
        },
        yellow: {
          600: "#f5b400",
        },
        blue: {
          600: "#4285f4"
        },
        red: "#C75454",

        green: "#2ed585",
      },
      fontFamily: {
        body: ['Roboto_400Regular', 'sans'],
        subtitle: ['Roboto_500Medium', 'sans'],
        heading: ['Roboto_700Bold'], 
      }
    },
  },
  plugins: [],
}

