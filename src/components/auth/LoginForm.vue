<template>
  <form @submit.prevent="handleSubmit" class="login-form">
    <BaseInput
      v-model="email"
      type="email"
      label="Email Address"
      placeholder="Enter your email"
      :error="errors.email"
      required
    />
    <BaseInput
      v-model="password"
      type="password"
      label="Password"
      placeholder="Enter your password"
      :error="errors.password"
      required
    />
    <div class="form-options">
      <label class="remember-me">
        <input type="checkbox" v-model="rememberMe">
        <span>Remember me</span>
      </label>
    </div>
    <BaseButton 
      type="submit" 
      :loading="loading"
      size="large"
    >
      Sign In
    </BaseButton>
  </form>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import BaseInput from '@/components/common/BaseInput.vue'
import BaseButton from '@/components/common/BaseButton.vue'
import { useAuthStore } from '@/stores/auth.store'
import { useFormValidation } from '@/composables/useFormValidation'

export default {
  name: 'LoginForm',
  components: { BaseInput, BaseButton },
  setup() {
    const router = useRouter()
    const authStore = useAuthStore()
    const formData = {
      email: ref(''),
      password: ref(''),
      rememberMe: ref(false)
    }
    const loading = ref(false)
    const { errors, validateForm } = useFormValidation(['email', 'password'])

    const handleSubmit = async () => {
      if (!validateForm({
        email: formData.email.value,
        password: formData.password.value
      })) return

      try {
        loading.value = true
        await authStore.login({
          email: formData.email.value,
          password: formData.password.value
        })
        router.push('/')
      } catch {
        errors.value.password = 'Invalid email or password'
      } finally {
        loading.value = false
      }
    }

    return {
      ...formData,
      loading,
      errors,
      handleSubmit
    }
  }
}
</script>

<style scoped>
.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.remember-me {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #4a5568;
  font-size: 0.875rem;
  cursor: pointer;
}

.remember-me input[type="checkbox"] {
  width: 1rem;
  height: 1rem;
  border-radius: 0.25rem;
  border: 2px solid #cbd5e0;
  cursor: pointer;
}
</style>
