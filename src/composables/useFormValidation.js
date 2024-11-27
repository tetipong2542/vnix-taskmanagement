import { ref } from 'vue'

export const useFormValidation = (fields) => {
  const errors = ref(Object.fromEntries(fields.map(field => [field, ''])))
  
  const EMAIL_REGEX = /\S+@\S+\.\S+/
  const validators = {
    email: (value) => {
      if (!value) return 'Email is required'
      if (!EMAIL_REGEX.test(value)) return 'Please enter a valid email'
      return ''
    },
    password: (value) => {
      if (!value) return 'Password is required'
      if (value.length < 8) return 'Password must be at least 8 characters'
      return ''
    },
    confirmPassword: (value, { password }) => {
      if (!value) return 'Please confirm your password'
      if (value !== password) return 'Passwords do not match'
      return ''
    },
    terms: (value) => !value ? 'You must accept the terms and conditions' : ''
  }

  const validateField = (field, value, formData = {}) => {
    const validator = validators[field]
    if (validator) {
      errors.value[field] = validator(value, formData)
    }
    return !errors.value[field]
  }

  const validateForm = (formData) => {
    let isValid = true
    Object.keys(errors.value).forEach(field => {
      if (!validateField(field, formData[field], formData)) {
        isValid = false
      }
    })
    return isValid
  }

  const resetErrors = () => {
    Object.keys(errors.value).forEach(field => {
      errors.value[field] = ''
    })
  }

  return {
    errors,
    validateField,
    validateForm,
    resetErrors
  }
}
