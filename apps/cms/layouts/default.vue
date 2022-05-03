<template>
  <div class="layout">
    <ProLayout
      title="CMS"
      :nav-theme="'dark'"
      :layout="'mix'"
      :menu-data="menuData"
      v-model:openKeys="state.openKeys"
      v-model:collapsed="state.collapsed"
      v-model:selectedKeys="state.selectedKeys"
    >
      <slot />
    </ProLayout>
  </div>
</template>

<script setup lang="ts">
// refs: https://github.com/vueComponent/pro-components/blob/next/packages/pro-layout/README.md
import ProLayout, {clearMenuItem} from '@ant-design-vue/pro-layout'
const router = useRouter()

// Menus order
const menus = ['/welcome', '/dashboard']

const menuData = clearMenuItem(
  router
    .getRoutes()
    .filter(route => route.path !== '/')
    .sort((a, b) => {
      const indexA = menus.indexOf(a.path)
      const indexB = menus.indexOf(b.path)

      return indexA - indexB
    }),
)

const state = reactive({
  collapsed: false,
  openKeys: [] as string[],
  selectedKeys: [] as string[],
})

watchEffect(() => {
  if (router.currentRoute) {
    const matched = router.currentRoute.value.matched.concat()
    state.selectedKeys = matched.filter(r => r.path !== '/').map(r => r.path)
    state.openKeys = matched
      .filter(r => r.path !== router.currentRoute.value.path)
      .map(r => r.path)
  }
})
</script>

<style>
.layout {
  width: 100vw;
  height: 100vh;
}
</style>
