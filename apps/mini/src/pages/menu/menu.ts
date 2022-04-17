import type {IApp} from '../../app'
import enchangePage from '../../enchange-page'
import {throttle} from '../../utils/index'

const $app = getApp<IApp>()

let mainAnchors: {id: string; top: number}[]

enchangePage({
  data: {
    categoryActiveId: '',
    topHeight: 0,
    mainHeight: 0,
    scrollIntoView: '',
    menus: [],
  },
  async onLoad() {
    // Fetch data
    // const menus = await $app.$request('menu', {
    // 	method: 'GET',
    // })
    const menus = require('../../api-mock/menus') as any
    const categoryActiveId = menus[0].id
    this.setData({
      menus,
      categoryActiveId,
    })

    // Computed
    this.computedHeight()
    this.computedMainAnchors()
  },

  onCategoryClick(event: MP.TouchEvent) {
    const {id} = event.target
    this.setData({
      categoryActiveId: id,
      scrollIntoView: `main-${id}`,
    })
  },

  onMainScroll: throttle(function (this: any, event: MP.ScrollViewScroll) {
    const {scrollTop} = event.detail
    const {topHeight} = this.data
    const top = scrollTop + topHeight
    for (let index = 0; index < mainAnchors.length - 1; index++) {
      const current = mainAnchors[index]
      const next = mainAnchors[index + 1]
      if (top >= current.top && top < next.top) {
        this.setData({
          categoryActiveId: current.id,
        })
        return
      }
    }
  }, 200),

  computedHeight() {
    wx.createSelectorQuery()
      .select('.js-top')
      .boundingClientRect()
      .exec(res => {
        const [{height}] = res
        this.setData({
          topHeight: height,
          mainHeight: $app.$system!.windowHeight - height,
        })
      })
  },

  computedMainAnchors() {
    wx.createSelectorQuery()
      .selectAll('#main  .js-anchor')
      .boundingClientRect()
      .exec(res => {
        const [list] = res
        mainAnchors = list.map((item: MP.BoundingClientRectCallbackResult) => {
          return {id: item.dataset.id, top: item.top}
        })
      })
  },
})
