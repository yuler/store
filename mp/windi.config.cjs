// Refs: https://windicss.org/guide/configuration.html
// @ts-check

const {defineConfig} = require('windicss/helpers');

module.exports = defineConfig({
	darkMode: 'class', // Or 'media' or 'class'
	theme: {
		screens: {},
		extend: {
			animation: {
				swing: 'swing .3s linear 2'
			},
			keyframes: {
				swing: {
					'20%': {transform: 'rotate(10deg)'},
					'40%': {transform: 'rotate(-10deg)'},
					'60%': {transform: 'rotate(10deg)'},
					'80%': {transform: 'rotate(-10deg)'},
					'100%': {transform: 'rotate(0deg)'}
				}
			}
		}
	}

});
