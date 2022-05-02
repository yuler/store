<template>
  <div>
    <h1>Index Page</h1>
    <AButton>Demo</AButton>
    <Hi></Hi>
  </div>
</template>

<script setup lang="ts">
const count = ref(1)
const double = computed(() => count.value * 2)
</script>
