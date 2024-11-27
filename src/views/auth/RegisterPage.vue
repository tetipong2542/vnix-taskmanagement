<template>
  <div class="auth-page">
    <div class="container">
      <div class="auth-container">
        <div class="auth-header">
          <h1>Create Account</h1>
          <p>Join us today! It takes only a few steps</p>
        </div>
        <RegisterForm />
        <div class="auth-footer">
          <p>Already have an account? <router-link to="/login">Sign in</router-link></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RegisterForm from '@/components/auth/RegisterForm.vue'

export default {
  name: 'RegisterPage',
  components: {
    RegisterForm
  }
}
</script>

<style scoped>
.auth-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f8fafc;
  padding: 20px;
}

.container {
  width: 1280px;
  max-width: 1366px;
  margin: 0 auto;
  padding: 0 1rem;
}

.auth-container {
  background: white;
  padding: 2.5rem;
  border-radius: 1rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  width: 100%;
  max-width: 480px;
  margin: 0 auto;
  border: 1px solid #e2e8f0;
}

.auth-header {
  text-align: center;
  margin-bottom: 2rem;
}

.auth-header h1 {
  color: #1a202c;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.auth-header p {
  color: #64748b;
  font-size: 1rem;
}

.auth-footer {
  text-align: center;
  margin-top: 1.5rem;
  color: #64748b;
}

.auth-footer a {
  color: #3b82f6;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.2s;
}

.auth-footer a:hover {
  color: #2563eb;
}

/* Responsive Design */
@media (max-width: 1400px) {
  .container {
    max-width: 1280px;
  }
}

@media (max-width: 1200px) {
  .container {
    max-width: 1024px;
  }
}

@media (max-width: 1024px) {
  .container {
    max-width: 768px;
  }
}

@media (max-width: 768px) {
  .container {
    width: 100%;
    padding: 0 1rem;
  }

  .auth-container {
    padding: 2rem;
    max-width: 100%;
  }

  .auth-header h1 {
    font-size: 1.75rem;
  }
}

@media (max-width: 480px) {
  .auth-page {
    padding: 1rem;
    background-color: white;
  }

  .auth-container {
    padding: 1.5rem;
    box-shadow: none;
    border: none;
  }

  .auth-header h1 {
    font-size: 1.5rem;
  }

  .auth-header p {
    font-size: 0.875rem;
  }
}
</style>
