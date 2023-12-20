import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { setCurrentChannel } from '../../../store/reducers/chatSlice'

const Users = () => {
  const { currentChannel } = useSelector((s) => s.chatSlice)
  const users = ['ivan', 'Sam']
  const dispatch = useDispatch()

  const handleClickSetCurrentChannel = (channel) => {
    dispatch(setCurrentChannel(channel))
  }

  const select = 'flex items-center px-4 bg-[#1164A3] py-1 text-white w-full text-left'
  const other = 'flex items-center px-4 py-1 text-[#E8E2E8] w-full text-left'

  return (
    <div>
      <div className="px-4 my-3 font-sans">Direct Messages</div>

      <div className="flex items-center px-4">
        <span className="bg-[#29A975] rounded-full block w-2 h-2 mr-2">{false}</span>
        <span className="text-purple-lightest">
          Olivia Dunham <i className="text-grey text-base font-medium">(me)</i>
        </span>
      </div>
      {users.map((it) => {
        return (
          <button
            type="button"
            key={it}
            className={it === currentChannel ? select : other}
            onClick={() => handleClickSetCurrentChannel(it)}
          >
            <span className="bg-[#29A975] rounded-full block w-2 h-2 mr-2">{false}</span>
            <span className="text-purple-lightest">{it}</span>
          </button>
        )
      })}
    </div>
  )
}

export default Users
