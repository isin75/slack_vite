import express from 'express'
import { resolve } from 'path'
import passport from 'passport'
import cookieParser from 'cookie-parser'
import cors from 'cors'
// import { Server } from 'socket.io'
import http from 'http'

import options from './config.js'
import router from './routes/routes.js'
import connectDB from './services/mongoose.js'
import jwtStrategy from './services/passport.js'

connectDB()

const serverPort = options.port || 8080
const server = express()
const httpServer = http.createServer(server)
// const io = new Server(httpServer, {
//   cors: {
//     origin: '*',
//     methods: ['GET', 'POST']
//   }
// })
const __dirname = process.cwd()

const middleware = [
  cors({ origin: '*' }),
  cookieParser(),
  express.json({ limit: '50kb' }),
  express.static(resolve(__dirname, 'dist')),
  router
]

passport.use('jwt', jwtStrategy)

middleware.forEach((it) => server.use(it))

const serverListen = httpServer.listen(serverPort, () => {
  const { port } = serverListen.address()
  console.log(`Server is running on port http://localhost:${port}/`)
})
