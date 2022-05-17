const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}"
  ],
  theme: {
    fontFamily: {
      'serif': ['"Serif Roman"', '"Noto Serif SC"']
    },
    colors: {
      ...colors,
      transparent: 'transparent',
      'black': '#333',
      'white': '#fff',
      'paper': {
        50: '#faf8f1',
        100: '#f8f5ea',
        200: '#f4eedc',
        300: '#efe7cd',
        400: '#e8dcb8',
        500: '#d1c6a6',
        600: '#bab093',
        700: '#a29a81',
        800: '#8b846e',
        900: '#746e5c',
      },
      'mint': {
        50: '#f1faf3',
        100: '#eaf8ed',
        200: '#dcf4e2',
        300: '#cdefd6',
        400: '#b8e8c4',
        500: '#a6d1b0',
        600: '#93ba9d',
        700: '#81a289',
        800: '#6e8b76',
        900: '#5c7462',
      },
      'vodka': {
        50: '#f1f3fa',
        100: '#eaedf8',
        200: '#dce2f4',
        300: '#cdd6ef',
        400: '#b8c4e8',
        500: '#a6b0d1',
        600: '#939dba',
        700: '#8189a2',
        800: '#6e768b',
        900: '#5c6274',
      },
      'thistle': {
        50: '#faf1f8',
        100: '#f8eaf5',
        200: '#f4dcee',
        300: '#edc6e3',
        400: '#e8b8dc',
        500: '#d1a6c6',
        600: '#ba93b0',
        700: '#a2819a',
        800: '#8b6e84',
        900: '#745c6e',
      },
    }
  },
  plugins: [
    function ({ addVariant, e }) {
      addVariant('child', '& > *')
      addVariant('child-hover', '& > *:hover')
      addVariant('selection', ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.${e(`selection${separator}${className}`)} ::selection`;
        })
      })
    }
  ],
}
