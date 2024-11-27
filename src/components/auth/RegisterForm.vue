<template>
  <form @submit.prevent="handleSubmit" class="register-form">
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
      placeholder="Choose a strong password"
      :error="errors.password"
      required
    />
    <BaseInput
      v-model="confirmPassword"
      type="password"
      label="Confirm Password"
      placeholder="Confirm your password"
      :error="errors.confirmPassword"
      required
    />
    <div class="terms">
      <label class="checkbox-label">
        <input type="checkbox" v-model="acceptTerms">
        <span>I agree to the Vnix Group Employee Requirements</span>
      </label>
      <span v-if="errors.terms" class="error-message">{{ errors.terms }}</span>
    </div>
    <BaseButton 
      type="submit" 
      :loading="loading"
      size="large"
    >
      Create Account
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
  name: 'RegisterForm',
  components: { BaseInput, BaseButton },
  setup() {
    const router = useRouter()
    const authStore = useAuthStore()
    const formData = {
      email: ref(''),
      password: ref(''),
      confirmPassword: ref(''),
      acceptTerms: ref(false)
    }
    const loading = ref(false)
    const { errors, validateForm } = useFormValidation(['email', 'password', 'confirmPassword', 'terms'])

    const handleSubmit = async () => {
      if (!validateForm({
        email: formData.email.value,
        password: formData.password.value,
        confirmPassword: formData.confirmPassword.value,
        terms: formData.acceptTerms.value
      })) return

      try {
        loading.value = true
        await authStore.register({
          email: formData.email.value,
          password: formData.password.value
        })
        router.push('/login')
      } catch {
        errors.value.email = 'This email is already registered'
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
.register-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.terms {
  margin-bottom: 0.5rem;
}

.checkbox-label {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  color: #4a5568;
  font-size: 0.875rem;
  cursor: pointer;
}

.checkbox-label input[type="checkbox"] {
  width: 1rem;
  height: 1rem;
  margin-top: 0.2rem;
  border-radius: 0.25rem;
  border: 2px solid #cbd5e0;
  cursor: pointer;
}

.error-message {
  display: block;
  margin-top: 0.5rem;
  color: #e53e3e;
  font-size: 0.75rem;
}
</style>
