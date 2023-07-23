/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'roboto': ['Roboto']
      },
      colors: {
        gray: {
          1: '#EFEFEF',
          2: '#A8A8A8',
          3: '#CECECE',
          4: '#D9D9D9',
          5: '#3e3d3d',
          6: '#E2E2E2'
        },
        brown: {
          1: '#895B26',
        },
        black: {
          1: '#262626',
          2: '#000000'
        },
        green: {
          1: '#268930'
        },
        white: {
          1: '#FFF8E6',
          2: 'rgba(239, 239, 239, 0.3)'
        },
        blue: {
          1: '#266589'
        }
      }
    },
  },
  plugins: [],
}

