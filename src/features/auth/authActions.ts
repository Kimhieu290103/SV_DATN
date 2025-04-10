import { createAsyncThunk } from '@reduxjs/toolkit'
import ClientApi from '~/api/ClientApi'
import { User } from '~/model/User/User'
interface LoginPayload {
  username: string
  password: string
}

interface LoginResponse {
  accessToken: string | null
  role: string
  userResponse: User
}
export const login = createAsyncThunk<LoginResponse, LoginPayload, { rejectValue: string }>(
  'auth/login',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await ClientApi.post(`users/login`, {
        username,
        password
      })
      console.log('response', response.data)
      return response.data
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message)
    }
  }
)
