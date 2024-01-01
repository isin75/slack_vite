import React, { useEffect, useState } from 'react'
import { Modal, Select, Space } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'antd/es/form/Form'
import { addUserToChannel, getChannels } from '../../../store/reducers/chatSlice'

const ModalSearch = ({ search, isSearch }) => {
  const { allChannels } = useSelector((s) => s.chatSlice)
  const [value, setValue] = useState('')
  const dispatch = useDispatch()
  const [form] = useForm()
  const handleClickOk = () => {
    dispatch(addUserToChannel({ channelId: value }))
    isSearch(!search)
    setValue('')
    form.resetFields()
  }
  const handleClickCancel = () => {
    isSearch(!search)
    form.resetFields()
    setValue('')
  }
  useEffect(() => {
    dispatch(getChannels())
  }, [search])
  return (
    <Modal
      title="Search channel"
      open={search}
      okText="Join to channel"
      okType="default"
      onOk={() => handleClickOk()}
      onCancel={() => handleClickCancel()}
      width={330}
    >
      <Space
        direction="vertical"
        style={{
          width: '100%'
        }}
      >
        <Select
          showSearch
          style={{
            width: 200
          }}
          placeholder="Search to Select"
          optionFilterProp="children"
          onChange={(newValue) => setValue(newValue)}
          filterOption={(input, option) => (option?.label ?? '').includes(input)}
          filterSort={(optionA, optionB) =>
            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
          }
        >
          {allChannels.map((option) => (
            <Select.Option key={option._id} value={option._id} label={option.name}>
              {option.name}
            </Select.Option>
          ))}
        </Select>
      </Space>
    </Modal>
  )
}

export default ModalSearch
