// import { SearchOutlined } from '@ant-design/icons'
import { Button, Select, Space } from 'antd'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addUserToChannel } from '../../../store/reducers/chatSlice'

const Header = () => {
  const { currentChannel, users } = useSelector((s) => s.chatSlice)
  const [value, setValue] = useState([])
  const dispatch = useDispatch()

  const handleClickAdd = () => {
    dispatch(addUserToChannel({ channelId: currentChannel.id, name: value }))
    setValue([])
  }

  return (
    <div className="border-b-2 h-[60px] flex items-center">
      <div className="flex-grow ml-[250px]">
        <div className=" font-semibold text-3xl">{currentChannel.name}</div>
        <div>{currentChannel?.description ? currentChannel.description : false}</div>
      </div>
      <div className="mt-[20px] mr-4 w-1/3 flex flex-row justify-end">
        <Space
          direction="vertical"
          style={{
            width: '70%'
          }}
        >
          <Select
            mode="multiple"
            style={{ width: '100%' }}
            value={value}
            onChange={(newValue) => setValue(newValue)}
            placeholder="Add user to channel"
            maxTagCount="responsive"
          >
            {users.map((option) => (
              <Select.Option key={option.email} value={option.name}>
                {option.name}
              </Select.Option>
            ))}
          </Select>
        </Space>
        <Button onClick={() => handleClickAdd()}>Add</Button>
      </div>
    </div>
  )
}

export default Header
