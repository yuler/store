import {defineNuxtConfig} from 'nuxt'
import Components from 'unplugin-vue-components/vite'
import {AntDesignVueResolver} from 'unplugin-vue-components/resolvers'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  typescript: {
    strict: true,
  },
  // modules: ['./modules/ant-design'],
  vite: {
    // @ts-expect-error refs: https://github.com/vueComponent/ant-design-vue/discussions/5210#discussion-3834140
    plugins: [
      Components({
        resolvers: [AntDesignVueResolver()],
      }),
    ],
    // @ts-expect-error: Missing ssr key
    ssr: {
      noExternal: ['moment', 'compute-scroll-into-view', 'ant-design-vue'],
    },
  },
})
