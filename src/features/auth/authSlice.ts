import { createSlice } from '@reduxjs/toolkit'
import { login } from './authActions'

interface AuthState {
  loading: boolean
  accessToken: string | null
  error: string | null
  success: boolean
}

const initialState: AuthState = {
  loading: false,
  accessToken: null,
  error: null,
  success: false
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.loading = false
      state.accessToken = null
      state.error = null
      state.success = false
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false
        state.accessToken = action.payload.accessToken
        state.success = true
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || 'An unknown error occurred'
        state.success = false
      })
  }
})

export const { logout } = authSlice.actions
export default authSlice.reducer
