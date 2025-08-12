import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5050/api'

const instance = axios.create({
  baseURL: API_BASE,
})

const setToken = (token) => {
  if (token) instance.defaults.headers.common['Authorization'] = 'Bearer ' + token
  else delete instance.defaults.headers.common['Authorization']
}

instance.interceptors.response.use(
  res => res,
  err => {
    // simple global error handling
    return Promise.reject(err)
  }
)

export default {
  instance,
  setToken,
  // convenience methods
  auth: {
    login: (payload) => instance.post('/auth/login', payload),
    register: (payload) => instance.post('/auth/register', payload),
  },
  transactions: {
    list: (params) => instance.get('/transactions', { params }),
    get: (id) => instance.get(`/transactions/${id}`),
    create: (data) => instance.post('/transactions', data),
    update: (id, data) => instance.put(`/transactions/${id}`, data),
    remove: (id) => instance.delete(`/transactions/${id}`),
    categories: () => instance.get('/transactions/meta/categories'),
  },
  analytics: {
    monthly: () => instance.get('/analytics/monthly'),
    yearly: () => instance.get('/analytics/yearly'),
    category: () => instance.get('/analytics/category-distribution'),
    trend: () => instance.get('/analytics/income-vs-expense'),
  },
  users: {
  list: (params) => instance.get('/users', { params }), // GET /users - list users (admin only)
  me: () => instance.get('/users/me'),                   // GET /users/me - current user info
  updateRole: (id, role) => instance.put(`/users/${id}/role`, { role }), // PUT /users/:id/role - update role (admin only)
  }
}
