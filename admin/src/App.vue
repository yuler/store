<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />

  <p v-if="isAuthed">{{user}}</p>
  <p v-else @click="login">Login</p>

</template>

<script lang="ts">
import {defineComponent} from 'vue'
import HelloWorld from './components/HelloWorld.vue'
import {useCloudBase} from './use'

export default defineComponent({
  name: 'App',
  components: {
    HelloWorld
  },
  setup: () => {
    const { app, auth, user, isAuthed} = useCloudBase()

    async function login() {
      const result = await auth.signInWithUsernameAndPassword('admin', import.meta.env.VITE_ADMIN_PASSWORD)
      console.log(result)
    }

    return {
      app,
      auth,
      user,
      isAuthed,
      login
    }
  }
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
