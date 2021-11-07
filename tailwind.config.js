module.exports = {
  purge: {
    enabled: true,
    content: ['./src/**/*.{html,ts}']
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      maxWidth: {
        '4/5': '80%'
      },
      colors: {
        blue: '#4285F4',
        black: '#333333'
      },
      gradientColorStops: {
        green: 'rgba(100, 150, 101, 0.4)',
        red: 'rgba(240, 0, 35, 0.4) 98.12%)'
      },
      fontFamily: {
        button: 'Roboto'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
};
