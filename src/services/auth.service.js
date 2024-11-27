// This is a mock service - replace with actual API calls
const API_DELAY = 1000;
const MOCK_TOKEN = 'mock-jwt-token';
const MOCK_USER = { id: 1, email: 'test@gmail.com' };

const delay = (ms = API_DELAY) => new Promise(resolve => setTimeout(resolve, ms));
const validateToken = token => token === MOCK_TOKEN;

export const authService = {
  async login({ email, password }) {
    await delay();
    if (email === MOCK_USER.email && password === '12345678') {
      const userData = { user: MOCK_USER, token: MOCK_TOKEN };
      localStorage.setItem('token', MOCK_TOKEN);
      return userData;
    }
    throw new Error('Invalid credentials');
  },

  async register({ email }) {
    await delay();
    return { success: true, message: 'Registration successful', user: { ...MOCK_USER, email } };
  },

  async getCurrentUser() {
    await delay(500);
    const token = localStorage.getItem('token');
    if (!token || !validateToken(token)) throw new Error('Invalid token');
    return { user: MOCK_USER };
  },

  async logout() {
    await delay(500);
    localStorage.removeItem('token');
  }
};
