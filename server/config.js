import dotenv from 'dotenv'

dotenv.config()

const options = {
  port: process.env.PORT,
  mongoUrl: process.env.MONGO_URL,
  secret: process.env.SECRET,
  isSocked: process.env.SOCKET_ENABLED,
  clientApi: process.env.CLIENT_API
}

export default options
