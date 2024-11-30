import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth.store'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomePage.vue'),
    // meta: { requiresAuth: true }
<<<<<<< HEAD
=======
  },
  {
    path: '/task',
    name: 'task',
    component: () => import('@/views/TaskPage.vue'),
    // meta: { requiresAuth: true }
>>>>>>> 2d707ac346db1fef57b99d6f67eee542341105a3
  },
  {
    path: '/home',
    redirect: '/'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/auth/LoginPage.vue'),
    meta: { guest: true }
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/auth/RegisterPage.vue'),
    meta: { guest: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  const isAuthenticated = authStore.isAuthenticated
  
  // Guest pages (login/register)
  if (to.meta.guest) {
    if (isAuthenticated) {
      next('/')
    } else {
      next()
    }
    return
  }

  // Protected routes
  if (to.meta.requiresAuth) {
    if (!isAuthenticated) {
      next('/login')
      return
    }

    try {
      const isValid = await authStore.checkAuth()
      if (!isValid) {
        next('/login')
        return
      }
    } catch {
      next('/login')
      return
    }
  }
  
  next()
})

export default router
