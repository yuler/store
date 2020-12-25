// See: https://tailwindcss.com/docs/configuration

module.exports = {
  purge: {
    enabled: true,
    content: ['./miniprogram/pages/**/*.axml', './miniprogram/components/**/*.axml'],
  },
  theme: {
    screens: {},  // disable screens
    boxShadow: {
      none: 'none',
    },
  },
  variants: {},
  plugins: [],
}
