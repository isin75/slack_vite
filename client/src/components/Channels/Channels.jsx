import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { PlusOutlined, SearchOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'

import { getUsersChannels, setCurrentChannel } from '../../../store/reducers/chatSlice'
import CustomModalAdd from '../modal/Modal'
import ModalSearch from '../modal/ModalSearch'

const Channels = () => {
  const { channels, currentChannel } = useSelector((s) => s.chatSlice)
  const [add, isAdd] = useState(false)
  const [search, isSearch] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleClickSetCurrentChannel = (channel) => {
    dispatch(
      setCurrentChannel({ name: channel.name, id: channel._id, description: channel.description })
    )
    navigate(`${channel.name}`)
  }

  const handleClickAdd = () => {
    isAdd(!add)
  }
  const handleClickSearch = () => {
    isSearch(!search)
  }

  useEffect(() => {
    dispatch(getUsersChannels())
  }, [])

  const select = 'bg-[#1164A3] py-1 px-4 text-white font-semibold w-full text-left'
  const other = 'py-1 px-4 text-[#E8E2E8] font-semibold w-full text-left'
  return (
    <div>
      <ModalSearch search={search} isSearch={isSearch} />
      <CustomModalAdd add={add} isAdd={isAdd} />
      <div className="flex flex-row px-4 mb-2 font-NotoSans">
        <div>Channels</div>
        <div className="flex flex-grow justify-end items-center right-0">
          <button type="button" onClick={() => handleClickSearch()}>
            <SearchOutlined />
          </button>
          <button className="mx-3" type="button" onClick={() => handleClickAdd()}>
            <PlusOutlined />
          </button>
        </div>
      </div>
      <div className="max-h-[200px] overflow-x-auto min-h-min">
        {channels.map((it) => {
          return (
            <button
              type="button"
              key={it._id}
              className={it._id === currentChannel.id ? select : other}
              onClick={() => handleClickSetCurrentChannel(it)}
            >
              <span className="pr-1 font-semibold text-base text-grey-light">#</span> {it.name}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default Channels
