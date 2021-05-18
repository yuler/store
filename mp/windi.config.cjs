// Refs: https://windicss.org/guide/configuration.html
// @ts-check

const { defineConfig } = require('windicss/helpers')

// // define spacing
// const spaces = [
// 	80,
// 	100
// ]
// const spacing = {}
// for (const space of spaces) {
// 	spacing[space] = `${space}rpx`
// }

module.exports = defineConfig({
	darkMode: 'class', // Or 'media' or 'class'
	theme: {
		screens: {},
	}
})
