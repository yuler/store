<template><div @click="onClick">dashboard</div></template>

<script setup lang="ts">
const router = useRouter()
definePageMeta({
  title: '管理页',
  icon: 'CrownOutlined',
})

function onClick() {
  router.push({path: '/welcome'})
}
</script>
