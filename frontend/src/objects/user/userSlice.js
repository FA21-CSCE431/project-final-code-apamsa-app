import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    userName: "",
    email: "",
    admin: false,
  },
  reducers: {
    login: (state, action) => {
        state.userName = action.payload.userName;
        state.email = action.payload.email;
        state.admin = action.payload.admin;
    },
  },
})

export const {login } = userSlice.actions

export default userSlice.reducer