import mongoose from 'mongoose'

const messagesSchema = new mongoose.Schema(
  {
    channelId: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'Channel'
    },
    message: {
      type: String
    },
    time: {
      type: Number
    },
    userId: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'User'
    },
    name: {
      type: String
    }
  },
  {
    timestamp: true
  }
)

export default mongoose.model('messages', messagesSchema)
