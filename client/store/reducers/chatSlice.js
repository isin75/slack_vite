import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import config from '../../config'
import { getSocket } from '../store'

const baseURL = config.api

export const getUsersChannels = createAsyncThunk('Chat/getUsersChannels', async () => {
  const url = `${baseURL}channel`
  const { data } = await axios(url, { withCredentials: true })
  return data
})

export const getChannels = createAsyncThunk('Chat/getChannels', async () => {
  const url = `${baseURL}channels`
  const { data } = await axios(url, { withCredentials: true })
  return data
})

export const joinToChat = (data) => {
  return () => {
    getSocket()?.emit('Join chat', data)
  }
}

export const addUserToChannel = createAsyncThunk(
  'Chat/addUserToChannel',
  async ({ channelId, name }) => {
    const url = `${baseURL}channel/${channelId}`
    const { data } = await axios.patch(
      url,
      { name },
      {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    return data
  }
)

export const createChannel = createAsyncThunk(
  'Chat/createChannel',
  async ({ name, description, userList }) => {
    const url = `${baseURL}channel`
    const { data } = await axios.post(
      url,
      { name, description, userList },
      {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    return data
  }
)

export const getMessage = createAsyncThunk('Chat/getMessage', async (channelId) => {
  const url = `${baseURL}messages/${channelId}`
  const { data } = await axios(url, { withCredentials: true })
  return data
})

export const getUsers = createAsyncThunk('Chat/getUsers', async () => {
  const url = `${baseURL}users`
  const { data } = await axios(url, { withCredentials: true })
  return data
})

export const sendMessage = createAsyncThunk(
  'Chat/sendMessage',
  async ({ message, channelId, userId, time }) => {
    const url = `${baseURL}messages`
    const { data } = await axios.post(
      url,
      { message, channelId, userId, time },
      {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    const connectionId = getSocket().id
    getSocket().emit('message', {
      message,
      channelId,
      userId,
      time,
      connectionId
    })
    return data
  }
)

export function getOnlineUsers(data) {
  return () => {
    getSocket()?.emit('Update Online Users Info', data)
  }
}

const initialState = {
  currentChannel: { name: 'general', id: 1, description: 'For all users' },
  allChannels: [],
  channels: ['general'],
  messages: [],
  users: [],
  status: null,
  error: null,
  onlineUsers: []
}

const chatSlice = createSlice({
  name: 'Chat',
  initialState,
  reducers: {
    setCurrentChannel(state, actions) {
      state.currentChannel = {
        name: actions.payload.name,
        id: actions.payload.id,
        description: actions.payload.description
      }
    },
    setParams(state, actions) {
      state.params = actions.payload
    },
    setMessagesFromSocket(state, actions) {
      state.messages = [...state.messages, actions.payload]
    },
    setOnlineUsers(state, actions) {
      state.onlineUsers = actions.payload
    }
  },
  extraReducers: {
    [getUsersChannels.pending]: (state) => {
      state.status = 'loading'
      state.error = null
    },
    [getUsersChannels.fulfilled]: (state, actions) => {
      state.status = 'resolve'
      state.channels = actions.payload
    },
    [createChannel.pending]: (state) => {
      state.status = 'loading'
      state.error = null
    },
    [createChannel.fulfilled]: (state, actions) => {
      state.status = 'resolve'
      state.channels = [...state.channels, actions.payload]
    },
    [sendMessage.pending]: (state) => {
      state.status = 'loading'
      state.error = null
    },
    [sendMessage.fulfilled]: (state, actions) => {
      state.status = 'resolve'
      state.messages = [...state.messages, actions.payload]
    },
    [getUsers.pending]: (state) => {
      state.status = 'loading'
      state.error = null
    },
    [getUsers.fulfilled]: (state, actions) => {
      state.status = 'resolve'
      state.users = actions.payload
    },
    [addUserToChannel.pending]: (state) => {
      state.status = 'loading'
      state.error = null
    },
    [addUserToChannel.fulfilled]: (state, actions) => {
      state.status = 'resolve'
      state.channels = actions.payload
    },
    [getChannels.pending]: (state) => {
      state.status = 'loading'
      state.error = null
    },
    [getChannels.fulfilled]: (state, actions) => {
      state.status = 'resolve'
      state.allChannels = actions.payload
    },
    [getMessage.pending]: (state) => {
      state.status = 'loading'
      state.error = null
    },
    [getMessage.fulfilled]: (state, actions) => {
      state.status = 'resolve'
      state.messages = actions.payload
    }
  }
})

export default chatSlice.reducer

export const { setCurrentChannel, setMessagesFromSocket, setOnlineUsers } = chatSlice.actions
