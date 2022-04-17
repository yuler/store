import {icons} from 'feather-icons'

Component({
	options: {
		virtualHost: true,
		styleIsolation: 'shared',
	},

	properties: {
		clazz: {
			type: String,
			value: '',
		},
		name: {
			type: String,
			value: '',
		},
		size: {
			type: String,
			value: 'medium',
		},
	},

	lifetimes: {
		attached() {
			this.setData({
				markImageValue: `url(data:image/svg+xml,${encodeURIComponent(
					icons[this.data.name].toSvg(),
				)})`,
			})
		},
	},
})
