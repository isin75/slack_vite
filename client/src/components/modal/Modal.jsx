import React, { useState } from 'react'
import { Form, Input, Modal } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { useDispatch } from 'react-redux'
import { createChannel } from '../../../store/reducers/chatSlice'

const CustomModalAdd = ({ add, isAdd }) => {
  const [form] = useForm()
  const [channels, addChannel] = useState('')
  const [description, setDescription] = useState('')
  const [users, addUsers] = useState([''])
  const dispatch = useDispatch()

  const handleInputChannel = (event) => {
    addChannel(event.target.value)
  }

  const handleInputDescription = (event) => {
    setDescription(event.target.value)
  }
  const handleInputUsers = (event) => {
    const userArr = event.target.value.split(' ')
    addUsers(userArr)
  }

  const handleClickOk = () => {
    dispatch(createChannel({ name: channels, description, userList: users }))
    form.resetFields()
    isAdd(!add)
  }
  const handleClickCancel = () => {
    form.resetFields()
    isAdd(!add)
  }
  return (
    <Modal
      title="Create a new Channel"
      open={add}
      okText="Create"
      okType="default"
      onOk={() => handleClickOk()}
      onCancel={() => handleClickCancel()}
    >
      <Form form={form}>
        <Form.Item
          name="channel"
          rules={[
            {
              required: true,
              message: 'Please input channel name!'
            }
          ]}
        >
          <Input placeholder="Channel name" onChange={handleInputChannel} value={channels} />
        </Form.Item>
        <Form.Item
          name="channelDescription"
          rules={[
            {
              required: true,
              message: 'Please input channel description!'
            }
          ]}
        >
          <Input
            placeholder="Channel description"
            onChange={handleInputDescription}
            value={description}
          />
        </Form.Item>
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: 'Please add another users!'
            }
          ]}
        >
          <Input placeholder="Add users" onChange={handleInputUsers} value={users} />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default CustomModalAdd
