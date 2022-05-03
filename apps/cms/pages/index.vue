<template>
  <div>Loading...</div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
})

const router = useRouter()

onMounted(() => {
  // TODO: Check login state
  router.push({path: '/welcome'})
})
</script>
