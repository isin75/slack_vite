import { configureStore } from '@reduxjs/toolkit'
import { io } from 'socket.io-client'

import rootReducer from './reducers/rootReducer'
import { setMessagesFromSocket, setOnlineUsers } from './reducers/chatSlice'
import config from '../config'

const store = configureStore({
  reducer: rootReducer
})

let socket

export const createSocket = (token) => {
  socket = io(config.ioSocket, {
    reconnection: true,
    reconnectionDelay: 500,
    autoConnect: true,
    reconnectionAttempts: 50,
    auth: {
      token
    }
  })

  socket.on('message', (data) => {
    store.dispatch(setMessagesFromSocket(data))
  })

  socket.on('Online users', (data) => {
    store.dispatch(setOnlineUsers(data))
  })
}

export function getSocket() {
  return socket
}

export default store
