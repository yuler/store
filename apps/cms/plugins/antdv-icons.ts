// Register all ant-design icons
// refs: https://github.com/vueComponent/pro-components/blob/6933724190e4b006bd749ed448fb8e7c4a7c7c15/packages/pro-layout/examples/icons.ts

import * as Icons from '@ant-design/icons-vue/es'
import type {IconType} from '@ant-design/icons-vue/es/components/Icon'

type AllIcon = {
  [key: string]: IconType
}

export const filterIcons = [
  'default',
  'createFromIconfontCN',
  'getTwoToneColor',
  'setTwoToneColor',
]

export default defineNuxtPlugin(nuxtApp => {
  const allIcon: AllIcon = Icons as any
  Object.keys(Icons)
    .filter(k => !filterIcons.includes(k))
    .forEach(k => {
      nuxtApp.vueApp.component(allIcon[k].displayName, allIcon[k])
    })
})
