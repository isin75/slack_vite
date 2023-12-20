import { combineReducers } from '@reduxjs/toolkit'
import chatSlice from './chatSlice'
import authSlice from './AuthSlice'

const rootReducer = combineReducers({
  chatSlice,
  authSlice
})

export default rootReducer
