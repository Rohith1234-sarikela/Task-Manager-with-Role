import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
})

api.interceptors.request.use(cfg => {
  const token = localStorage.getItem('token')
  // debug: log whether token exists when sending requests
  try { console.debug('API request', cfg.method, cfg.url, 'hasToken=', !!token) } catch (e) {}
  if (token) cfg.headers.Authorization = `Bearer ${token}`
  return cfg
})

export default api
