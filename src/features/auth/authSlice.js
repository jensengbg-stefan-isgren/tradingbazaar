import {createSlice} from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name:'auth', 
    initialState: {
      uid: null,
      isAuthenticated: null,
      isRegistered: null,
      errorMessage: null,
      user: null,
  },

reducers: {
  authenticateUser : (state,action) => {
    const {status,uid} = action.payload
    state.isAuthenticated = status
    state.uid = uid
  },
  checkIfRegistered : (state, action) => {
    const {status,message} = action.payload
    state.isRegistered = status
    state.errorMessage = message
  },
  addUser : (state,action) => {
    state.user = action.payload
  }
}
})



export const {addUser,authenticateUser,checkIfRegistered} = authSlice.actions
export default authSlice.reducer
