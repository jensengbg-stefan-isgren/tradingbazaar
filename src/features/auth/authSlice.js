import {createSlice} from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name:'auth', 
    initialState: {
      isAuthenticated: null,
      isRegistered: null,
      errorMessage: null
  },

reducers: {
  authenticateUser : (state,action) => {
    state.isAuthenticated = action.payload
  },
  checkIfRegistered : (state, action) => {
    const {status,message} = action.payload
    state.isRegistered = status
    state.errorMessage = message
  }
}
})



export const {authenticateUser,checkIfRegistered} = authSlice.actions
export default authSlice.reducer
