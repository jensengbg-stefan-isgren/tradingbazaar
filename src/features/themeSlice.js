import { createSlice } from '@reduxjs/toolkit'

export const themeSlice = createSlice({
  name: 'theme',
  initialState:{
    themeMode: 'light'
  },

  reducers: {
    toggleTheme: (state, action) => {

     switch(action.payload) {
       case 'light' :
         state.themeMode = 'dark'
         window.localStorage.setItem('theme','dark')
         break;
         case 'dark' :
           state.themeMode = 'light'
           window.localStorage.setItem('theme','light')
           break;
           default:
     }
     
    },
  },
})

export const { toggleTheme } = themeSlice.actions
export default themeSlice.reducer
