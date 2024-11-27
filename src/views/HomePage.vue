<template>
  <div class="home-page">
    <h1 style="color: black;">Welcome to Home Page</h1>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth.store'

export default {
  name: 'HomePage',
  setup() {
    const router = useRouter()
    const authStore = useAuthStore()

    return {
    }
  }
}
</script>

<style scoped>
.home-page {
  padding: 20px;
}
</style>
