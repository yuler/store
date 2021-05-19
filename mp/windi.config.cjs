// Refs: https://windicss.org/guide/configuration.html
// @ts-check

const {defineConfig} = require('windicss/helpers');

module.exports = defineConfig({
	darkMode: 'class', // Or 'media' or 'class'
	theme: {
		screens: {}
	}
});
