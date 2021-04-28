module.exports = {
  trailingComma: 'es5',
  semi: false,
  singleQuote: true,
  printWidth: 80,
  overrides: [
    {
      files: '*.wxml',
      options: {
        parser: 'html',
      },
    },
    {
      files: '*.wxss',
      options: {
        parser: 'css',
      },
    },
    {
      files: '*.wxs',
      options: {
        parser: 'babel',
      },
    },
  ],
}
