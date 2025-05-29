import axios from 'axios'
import { store } from '~/store/store'

const ClientApi = axios.create({
  baseURL: 'https://datn-backend-yr7b.onrender.com/api/v1',
  timeout: 60000,
  // #import.meta.env.VITE_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})
export default ClientApi

ClientApi.interceptors.request.use(
  (config) => {
    const accessToken = store.getState()?.auth?.accessToken
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`
    }
    return config
  },
  (error) => Promise.reject(error)
)
