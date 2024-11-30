<script setup>
import { useRouter, useRoute } from 'vue-router'
import { computed } from 'vue'
import BaseButton from '@/components/common/BaseButton.vue'
import { useAuthStore } from '@/stores/auth.store'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const handleLogout = async () => {
  await authStore.logout()
  router.push('/login')
}

// ใช้ computed เพื่อให้ showSidebar เป็น reactive และตรวจสอบเส้นทางอย่างถูกต้อง
const showSidebar = computed(() => {
  const path = route.path.replace(/\/$/, '') // Remove trailing slash if present
  return !['/login', '/register'].includes(path)
})
</script>

<template>
  <div class="app-container">
    <!-- แสดง Sidebar เฉพาะเมื่อ showSidebar เป็น true -->
    <aside v-if="showSidebar" class="sidebar">
       <!-- เพิ่ม User Profile -->
  <div class="user-profile">
    <div class="avatar">
      <span class="avatar-text">{{ authStore.user?.email?.charAt(0).toUpperCase() }}</span>
    </div>
    <div class="user-info">
      <span class="user-email">{{ authStore.user?.email }}</span>
    </div>
  </div>
      <nav>
        <ul>
          <li><a href="/home">Home</a></li>
          <li><a href="/task">Task</a></li>
          <li><a href="#">Profile</a></li>
          <li><a href="#">Settings</a></li>
          <li><BaseButton @click="handleLogout">Logout</BaseButton></li>
        </ul>
      </nav>
    </aside>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<style>
.app-container {
  display: flex;
  height: 100vh;
  font-family: 'Arial', sans-serif;
}

.sidebar {
  width: 220px;
  background-color: #ffffff;
  border-right: 1px solid #e0e0e0;
  padding: 20px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
}

.sidebar nav ul {
  list-style-type: none;
  padding: 0;
}

.sidebar nav ul li {
  margin: 20px 0;
}

.sidebar nav ul li a {
  text-decoration: none;
  color: #333;
  font-weight: 600;
  transition: color 0.3s ease;
}

.sidebar nav ul li a:hover {
  color: #007bff;
}

.content {
  flex-grow: 1;
  background-color: #f5f5f5;
  overflow-y: auto;
}

body {
  margin: 0;
  background-color: #e9ecef;
}

/* User Profile Styles */
.user-profile {
  display: flex;
  align-items: center;
  padding: 16px 0;
  margin-bottom: 20px;
  border-bottom: 1px solid #e0e0e0;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #007bff;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
}

.avatar-text {
  color: white;
  font-weight: bold;
  font-size: 18px;
}

.user-info {
  flex: 1;
  overflow: hidden;
}

.user-email {
  display: block;
  font-size: 14px;
  color: #333;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
