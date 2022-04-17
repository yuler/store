import type {IApp} from '../../app'
import enchangePage from '../../enchange-page'

const $app = getApp<IApp>()

interface Tab {
	id: number
	name: string
}

enchangePage({
	data: {
		tabs: [
			{id: 1, name: '茶饮鲜食'},
			{id: 2, name: '喜茶百货'},
		],
		tabActiveId: 1,
	},
	onLoad() {},

	onClickTab(event: MP.CustomEvent) {
		const {tab} = event.target.dataset as {tab: Tab}
		const {tabActiveId} = this.data
		if (tab.id !== tabActiveId) {
			this.setData({
				tabActiveId: tab.id,
			})
		}
	},
})
