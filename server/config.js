import dotenv from 'dotenv'

dotenv.config()

const options = {
  port: process.env.PORT,
  mongoUrl: process.env.MONGO_URL,
  secret: process.env.SECRET
}

export default options
