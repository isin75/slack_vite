import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../common/Message/Message'
import { getMessage, joinToChat } from '../../../store/reducers/chatSlice'

const Chat = () => {
  const { messages, currentChannel } = useSelector((s) => s.chatSlice)
  const { user } = useSelector((s) => s.authSlice)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getMessage(currentChannel.id))
    dispatch(joinToChat(currentChannel.id))
  }, [currentChannel])
  return (
    <div className="ml-[225px] w-[calc(100%-230px)] max-h-[calc(100%-120px)] overflow-auto mt-[60px] px-4 pt-1 pb-1">
      {messages.map((m) => (
        <Message
          key={m._id}
          text={m.message}
          isSentByUser={m.name === user.name}
          senderName={m.name}
          timestamp={m.time}
        />
      ))}
    </div>
  )
}

export default Chat
