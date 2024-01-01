import express from 'express'
import { resolve } from 'path'
import passport from 'passport'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { Server } from 'socket.io'
import http from 'http'
import jwt from 'jsonwebtoken'

import options from './config.js'
import router from './routes/routes.js'
import connectDB from './services/mongoose.js'
import jwtStrategy from './services/passport.js'
import User from './models/User.model.js'

connectDB()

const serverPort = options.port || 8080
const server = express()
const httpServer = http.createServer(server)
const io = new Server(httpServer, {
  cors: {
    origin: options.clientApi,
    methods: ['GET', 'POST'],
    credentials: true
  }
})
let WSConnections = []
let onlineUsersInfo = []
const __dirname = process.cwd()

const middleware = [
  cors({
    origin: 'https://dev--sunny-platypus-d1e61f.netlify.app',
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization']
  }),
  passport.initialize(),
  cookieParser(),
  express.json({ limit: '50kb' }),
  express.static(resolve(__dirname, 'dist')),
  router
]

passport.use('jwt', jwtStrategy)

middleware.forEach((it) => server.use(it))

if (options.isSocked) {
  io.on('connection', async (socket) => {
    const { token } = socket.handshake.auth
    const jwtUser = jwt.verify(token, options.secret)

    const user = await User.findById(jwtUser.uid)
    console.log(`${user.name} connected, id:${socket.id}`)
    WSConnections.push(user.name)

    socket.on('Join chat', (activeChannel) => {
      const userInfo = {
        id: socket.id,
        room: activeChannel
      }
      io?.emit('Online users', WSConnections)
      console.log('emit Online users', WSConnections)
      onlineUsersInfo.push(userInfo)
    })

    socket.on('Update Online Users Info', (activeChannel) => {
      console.log(`${socket.id} went into the room ${activeChannel}`)
      onlineUsersInfo.map((it) => {
        if (it.id === socket.id) {
          // eslint-disable-next-line no-param-reassign
          it.room = activeChannel
        }
        return it
      })
    })

    socket.on('message', (data) => {
      const userInCurrentRoom = onlineUsersInfo.filter(
        (it) => it.room === data.channelId && it.id !== data.connectionId
      )
      console.log(`message ${data.message} from ${data.userId} to #${data.channelId} `)
      userInCurrentRoom.forEach((it) => {
        io.to(`${it.id}`)?.emit('message', data)
      })
      console.log('Users are in the room:', userInCurrentRoom)
    })

    socket.on('disconnect', () => {
      WSConnections = WSConnections.filter((it) => it !== user.email)
      onlineUsersInfo = onlineUsersInfo.filter((it) => it.id !== socket.id)
      console.log(`${user.email} disconnected`)
      io?.emit('Online users', WSConnections)
    })
  })
}

const serverListen = httpServer.listen(serverPort, () => {
  const { port } = serverListen.address()
  console.log(`Server is running on port http://localhost:${port}/`)
})
