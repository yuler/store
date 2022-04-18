import type {IApp} from '../app'
import enchangePage from '../enchange-page'

const $app = getApp<IApp>()

enchangePage({
  data: {
    bannerHeight: 333,
    banners: [],
    modules: [],
  },
  onLoad() {
    // TODO: Fetch banners
    const {banners, modules} = require('../api-mock/home')
    this.setData({
      banners,
      modules,
    })
  },

  onBannerImageLoaded(event: MP.ImageLoad) {
    const {width, height} = event.detail
    const ratio = width / height
    const bannerHeight = $app.$system!.windowWidth / ratio
    if (bannerHeight > this.data.bannerHeight) {
      this.setData({
        bannerHeight,
      })
    }
  },

  gotoMenu() {
    $app.$goto('/pages/menu/menu')
  },
})
