import { createSlice } from '@reduxjs/toolkit'
import { User } from '~/model/User/User'

const initialState: User = {
  id: null,
  fullname: null,
  phoneNumber: null, //number ?
  studentId: null,
  address: null,
  email: null,
  dateOfBirth: null,
  username: null,
  active: false
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.id = action.payload.id
      state.fullname = action.payload.fullname
      state.phoneNumber = action.payload.phoneNumber
      state.studentId = action.payload.studentId
      state.address = action.payload.address
      state.email = action.payload.email
      state.dateOfBirth = action.payload.dateOfBirth
      state.username = action.payload.username
      state.active = true
    },
    clearUser(state) {
      state.id = null
      state.fullname = null
      state.phoneNumber = null
      state.studentId = null
      state.address = null
      state.email = null
      state.dateOfBirth = null
      state.username = null
      state.active = false
    }
  }
})
export const { setUser, clearUser } = userSlice.actions

export default userSlice.reducer
