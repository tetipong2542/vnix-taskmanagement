<template>
  <div class="base-input">
    <label v-if="label" :for="id" class="label">{{ label }}</label>
    <div class="input-wrapper">
      <input
        :id="id"
        :type="type"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        class="input"
        :class="{ 'has-error': error }"
        :placeholder="placeholder"
        :required="required"
      />
      <span v-if="error" class="error-message">{{ error }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseInput',
  props: {
    modelValue: {
      type: [String, Number],
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    placeholder: {
      type: String,
      default: ''
    },
    required: {
      type: Boolean,
      default: false
    },
    error: {
      type: String,
      default: ''
    }
  },
  emits: ['update:modelValue'],
  computed: {
    id() {
      return `input-${this._uid}`
    }
  }
}
</script>

<style scoped>
.base-input {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #4a5568;
}

.input-wrapper {
  position: relative;
}

.input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  font-size: 1rem;
  color: #2d3748;
  transition: all 0.2s;
  background-color: #f7fafc;
}

.input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  background-color: white;
}

.input::placeholder {
  color: #a0aec0;
}

.input.has-error {
  border-color: #e53e3e;
}

.error-message {
  position: absolute;
  left: 0;
  bottom: -1.25rem;
  font-size: 0.75rem;
  color: #e53e3e;
}
</style>
