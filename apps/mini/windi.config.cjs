const {defineConfig} = require('windicss/helpers')

module.exports = defineConfig({
  theme: {
    darkMode: false,
    preflight: false,
    screens: false,
    container: false,
    tabSize: {},
    extend: {
      fontSize: {
        '2xs': '0.6rem',
      },
    },
  },
})
