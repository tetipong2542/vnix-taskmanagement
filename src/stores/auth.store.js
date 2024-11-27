import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { authService } from '@/services/auth.service'
import router from '@/router'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const token = ref(localStorage.getItem('token'))
  
  const isAuthenticated = computed(() => !!token.value && !!user.value)

  const setAuthState = (userData = null) => {
    user.value = userData?.user || null
    token.value = userData?.token || null
    if (userData?.token) {
      localStorage.setItem('token', userData.token)
    } else {
      localStorage.removeItem('token')
    }
  }

  const login = async (credentials) => {
    const response = await authService.login(credentials)
    setAuthState(response)
  }

  const register = async (credentials) => {
    await authService.register(credentials)
    return { success: true }
  }

  const logout = async () => {
    await authService.logout()
    setAuthState()
    router.push('/login')
  }

  const checkAuth = async () => {
    if (!token.value) return false

    try {
      const response = await authService.getCurrentUser()
      user.value = response.user
      return true
    } catch {
      setAuthState()
      return false
    }
  }

  // Initialize auth state
  if (token.value) {
    checkAuth().catch(() => setAuthState())
  }

  return {
    user,
    token,
    isAuthenticated,
    login,
    register,
    logout,
    checkAuth
  }
})
