import { PlusOutlined } from '@ant-design/icons'
import { Button, Input, Space } from 'antd'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { sendMessage } from '../../../store/reducers/chatSlice'

const Footer = () => {
  const { currentChannel } = useSelector((s) => s.chatSlice)
  const { user } = useSelector((s) => s.authSlice)
  const [message, setMessage] = useState('')
  const dispatch = useDispatch()
  const handleInput = (e) => {
    setMessage(e.target.value)
  }
  const time = +new Date()
  const handleClickSubmit = () => {
    dispatch(sendMessage({ message, channelId: currentChannel.id, userId: user._id, time }))
    setMessage('')
  }
  const handleClickEnter = (e) => {
    if (message && e.key === 'Enter') {
      handleClickSubmit()
    }
  }
  return (
    <div>
      <Space.Compact className="ml-[250px] w-[calc(100%-280px)] mb-4 bg-white">
        <Button
          type="default"
          className="flex justify-center items-center"
          onClick={() => handleClickSubmit()}
        >
          <PlusOutlined />
        </Button>
        <Input
          placeholder={`Message to ${currentChannel}`}
          value={message}
          onChange={handleInput}
          onKeyPress={handleClickEnter}
        />
      </Space.Compact>
    </div>
  )
}

export default Footer
