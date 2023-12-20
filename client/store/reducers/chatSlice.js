import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentChannel: '',
  channels: ['general', 'other-business'],
  messages: {},
  users: []
}

const chatSlice = createSlice({
  name: 'Chat',
  initialState,
  reducers: {
    setCurrentChannel(state, actions) {
      state.currentChannel = actions.payload
    }
  }
})

export default chatSlice.reducer

export const { setCurrentChannel } = chatSlice.actions
