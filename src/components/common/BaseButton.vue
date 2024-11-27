<template>
  <button
    :type="type"
    :disabled="loading || disabled"
    class="base-button"
    :class="[variant, size, { loading }]"
  >
    <span v-if="loading" class="loader"></span>
    <slot v-else></slot>
  </button>
</template>

<script>
export default {
  name: 'BaseButton',
  props: {
    type: {
      type: String,
      default: 'button'
    },
    loading: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    variant: {
      type: String,
      default: 'primary',
      validator: (value) => ['primary', 'secondary', 'outline'].includes(value)
    },
    size: {
      type: String,
      default: 'medium',
      validator: (value) => ['small', 'medium', 'large'].includes(value)
    }
  }
}
</script>

<style scoped>
.base-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  width: 100%;
}

/* Sizes */
.small {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
}

.medium {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
}

.large {
  padding: 1rem 2rem;
  font-size: 1.125rem;
}

/* Variants */
.primary {
  background-color: #667eea;
  color: white;
}

.primary:hover:not(:disabled) {
  background-color: #5a67d8;
  transform: translateY(-1px);
}

.secondary {
  background-color: #718096;
  color: white;
}

.secondary:hover:not(:disabled) {
  background-color: #4a5568;
  transform: translateY(-1px);
}

.outline {
  background-color: transparent;
  border: 2px solid #667eea;
  color: #667eea;
}

.outline:hover:not(:disabled) {
  background-color: #667eea;
  color: white;
  transform: translateY(-1px);
}

/* Disabled state */
.base-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none !important;
}

/* Loading state */
.loading {
  color: transparent;
  position: relative;
}

.loader {
  width: 20px;
  height: 20px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s linear infinite;
  position: absolute;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Active state */
.base-button:active:not(:disabled) {
  transform: translateY(0);
}

/* Focus state */
.base-button:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.5);
}
</style>
