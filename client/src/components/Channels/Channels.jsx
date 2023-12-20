import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { setCurrentChannel } from '../../../store/reducers/chatSlice'

const Channels = () => {
  const { channels, currentChannel } = useSelector((s) => s.chatSlice)
  const dispatch = useDispatch()
  const addChannelToggle = false

  const handleClickSetCurrentChannel = (channel) => {
    dispatch(setCurrentChannel(channel))
  }

  const select = 'bg-[#1164A3] py-1 px-4 text-white font-semibold w-full text-left'
  const other = 'py-1 px-4 text-[#E8E2E8] font-semibold w-full text-left'
  return (
    <div>
      <div className="flex flex-row px-4 mb-2 font-NotoSans">
        <div>Channels</div>
        <button
          className="border border-gray-b ml-2 h-auto w-6 rounded-md"
          type="button"
          onClick={null}
        >
          +
        </button>
      </div>
      {addChannelToggle ? (
        <div className="flex flex-row px-4">
          <input type="text" className="text-black" onChange={null} value={null} />
          <button
            type="button"
            onClick={null}
            className=" bg-purple-darker border border-purple-lighter px-2 rounded-md"
          >
            save
          </button>
        </div>
      ) : (
        false
      )}
      {channels.map((it) => {
        return (
          <button
            type="button"
            key={it}
            className={it === currentChannel ? select : other}
            onClick={() => handleClickSetCurrentChannel(it)}
          >
            <span className="pr-1 font-semibold text-base text-grey-light">#</span> {it}
          </button>
        )
      })}
    </div>
  )
}

export default Channels
