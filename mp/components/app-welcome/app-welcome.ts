Component({
	options: {
		styleIsolation: 'apply-shared'
	},
	lifetimes: {
		attached() {
			console.log('attached');
		}
	}
});
